# frozen_string_literal: true

require "rails_helper"

RSpec.describe Interview, type: :model do
  it "has a valid factory" do
    interview = build(:interview)
    expect(interview).to be_valid
    expect(interview).not_to be_specialist_and_user

    interview = create(:interview, :with_specialist_and_user)
    expect(interview).to be_valid
    expect(interview).to be_specialist_and_user
  end

  describe "#specialist and #user" do
    let(:interview) { create(:interview) }
    let(:specialist_participant) { create(:specialist) }
    let(:user_participant) { create(:user) }

    before do
      create(:interview_participant, interview:, account: user_participant.account)
      create(:interview_participant, interview:, account: specialist_participant.account)
    end

    it "returns the account who responds to a called method" do
      expect(interview.specialist).to eq(specialist_participant)
      expect(interview.user).to eq(user_participant)
      expect(interview.accounts).to match_array([specialist_participant.account, user_participant.account])
    end
  end

  describe "#reschedule!" do
    let(:start_time) { Time.zone.parse("14.6.2022 9:30") }
    let(:new_start_time) { Time.zone.parse("14.6.2022 10:30") }
    let(:interview) { create(:interview, :with_two_accounts, starts_at: start_time) }

    it "updates starts at and creates a new message" do
      interview.reschedule!(new_start_time)
      interview.reload
      expect(interview.starts_at).to eq(new_start_time)
      message = interview.conversation.messages.last
      expect(message.kind).to eq("InterviewRescheduled")
      expect(message.interview).to eq(interview)
      expect(message.metadata).to eq({"starts_at" => new_start_time.iso8601})
    end

    context "when the interview is not reschedulable" do
      let(:interview) { create(:interview, :with_two_accounts, starts_at: start_time, status: "Auto Declined") }

      it "does nothing" do
        interview.reschedule!(new_start_time)
        interview.reload
        expect(interview.starts_at).to eq(start_time)
        message = interview.conversation.messages.last
        expect(message).to be_nil
      end
    end

    context "when the new start time is almost the same (google rounds up)" do
      let(:new_start_time) { start_time + 3.seconds }

      it "does nothing" do
        interview.reschedule!(new_start_time)
        interview.reload
        expect(interview.starts_at).to eq(start_time)
        message = interview.conversation.messages.last
        expect(message).to be_nil
      end
    end
  end
end
