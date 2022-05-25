# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ScheduleInterview do
  let(:status) { "Call Requested" }
  let(:specialist) { create(:specialist) }
  let(:user) { create(:user, availability: [Time.zone.now.next_weekday.beginning_of_day]) }
  let(:starts_at) { user.availability.first }
  let(:initial_starts_at) { nil }
  let(:current_user) { specialist }
  let(:interview) { create(:interview, accounts: [specialist.account, user.account], starts_at: initial_starts_at, status:) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        scheduleInterview(input: {
          id: "#{interview.uid}",
          startsAt: "#{starts_at}",
        }) {
          interview {
            id
            status
            startsAt
          }
        }
      }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview)
  end

  def request
    AdvisableSchema.execute(query, context: {current_user:})
  end

  it "sets the interview status to Call Scheduled" do
    expect do
      request
    end.to change {
      interview.reload.status
    }.from("Call Requested").to("Call Scheduled")
  end

  it "sets the startsAt attribute" do
    expect do
      request
    end.to change {
      interview.reload.starts_at
    }.from(nil).to(user.availability.first)
  end

  it "sets call_scheduled_at" do
    request
    expect(interview.reload.call_scheduled_at).to be_within(1.second).of(Time.zone.now)
  end

  it "creates a video call record" do
    expect { request }.to(change(VideoCall, :count).by(1))
  end

  it "creates a new message in a conversation" do
    c_count = Conversation.count
    request
    expect(Conversation.count).to eq(c_count + 1)
    conversation = Conversation.last
    expect(conversation.participants.pluck(:account_id)).to match_array([user.account.id, specialist.account.id])
    expect(conversation.messages.count).to eq(1)
    message = conversation.messages.first
    expect(message.author).to be_nil
    expect(message.kind).to eq("InterviewScheduled")
    expect(message.author).to be_nil
  end

  it "sends introductory email to specialist" do
    request
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("SpecialistMailer", "first_interview_scheduled", "deliver_now", {args: [interview]}).once
    expect(specialist.account.reload.completed_tutorials).to include("introductory_call")
  end

  context "when it's not first call for specialist" do
    it "does not send an email" do
      specialist.account.update(completed_tutorials: ["introductory_call"])
      request
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("SpecialistMailer", "first_interview_scheduled", "deliver_now", {args: [interview]})
    end
  end

  it "creates gcal events" do
    expect_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview).with(interview)
    request
  end

  context "when a video call already exists for that interview" do
    it "doesnt create a video call record" do
      VideoCall.create(interview:)
      expect { request }.not_to(change(VideoCall, :count))
    end
  end

  context "when logged in specialist is a different specialist" do
    let(:current_user) { create(:specialist) }

    it "raises an error" do
      error = request["errors"].first["extensions"]["type"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the interview is already scheduled" do
    let(:status) { "Call Scheduled" }

    it "returns an error" do
      response = request
      error = response["errors"].first
      expect(error["extensions"]["type"]).to eq("INVALID_REQUEST")
      expect(error["extensions"]["code"]).to eq("INTERVIEW_IS_NOT_SCHEDULABLE")
    end
  end

  context "when the user is not available at the given time" do
    let(:starts_at) { 10.days.from_now.utc.iso8601 }

    it "returns an error" do
      response = request
      error = response["errors"].first
      expect(error["extensions"]["type"]).to eq("INVALID_REQUEST")
      expect(error["extensions"]["code"]).to eq("STARTS_AT_NOT_AVAILABLE_ON_CLIENT")
    end
  end

  describe "has to be a specialist" do
    context "when specialist not logged in" do
      let(:current_user) { nil }

      it "raises an error" do
        error = request["errors"].first["extensions"]["type"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end

    context "when logged in user not specialist" do
      let(:current_user) { user }

      it "raises an error" do
        error = request["errors"].first["extensions"]["type"]
        expect(error).to eq("INVALID_REQUEST")
      end
    end
  end
end
