# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::ScheduleInterview do
  let(:status) { "Call Requested" }
  let(:specialist) { create(:specialist) }
  let(:application) { create(:application, specialist: specialist) }
  let(:user) { create(:user, availability: [Time.zone.now.next_weekday.beginning_of_day]) }
  let(:starts_at) { user.availability.first }
  let(:initial_starts_at) { nil }
  let(:current_user) { specialist }
  let(:interview) { create(:interview, starts_at: initial_starts_at, status: status, application: application, user: user) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        scheduleInterview(input: {
          id: "#{interview.uid}",
          startsAt: "#{starts_at}",
          phoneNumber: "0123456789"
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
  end

  def request
    AdvisableSchema.execute(query, context: {current_user: current_user})
  end

  it 'sets the interview status to Call Scheduled' do
    expect do
      request
    end.to change {
      interview.reload.status
    }.from("Call Requested").to("Call Scheduled")
  end

  it 'sets the startsAt attribute' do
    expect do
      request
    end.to change {
      interview.reload.starts_at
    }.from(nil).to(user.availability.first)
  end

  it 'sets the specialist phone number' do
    expect do
      request
    end.to change {
      specialist.reload.phone
    }.from(nil).to('0123456789')
  end

  it 'sets call_scheduled_at' do
    request
    expect(interview.reload.call_scheduled_at).to be_within(1.second).of(Time.zone.now)
  end

  it "creates a video call record" do
    expect { request }.to(change(VideoCall, :count).by(1))
  end

  context "when a video call already exists for that interview" do
    it "doesnt create a video call record" do
      VideoCall.create(interview: interview)
      expect { request }.not_to(change(VideoCall, :count))
    end
  end

  context 'when the interview is already scheduled' do
    let(:status) { "Call Scheduled" }

    it 'returns an error' do
      response = request
      error = response["errors"].first
      expect(error["extensions"]["type"]).to eq("INVALID_REQUEST")
      expect(error["extensions"]["code"]).to eq("INTERVIEW_IS_NOT_SCHEDULABLE")
    end
  end

  context 'when the user is not available at the given time' do
    let(:starts_at) { 10.days.from_now.utc.iso8601 }

    it 'returns an error' do
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
