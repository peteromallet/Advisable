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

  describe "#specialist" do
    let(:specialist) { create(:specialist) }
    let(:interview) { create(:interview, specialist:, user: nil) }
    let(:specialist_participant) { create(:specialist) }
    let(:user_participant) { create(:user) }

    before do
      create(:interview_participant, interview:, account: user_participant.account)
      create(:interview_participant, interview:, account: specialist_participant.account)
    end

    context "when the interview has a legacy specialist" do
      it "returns the legacy specialist" do
        expect(interview.specialist).to eq(specialist)
        expect(interview.participants).to match_array([specialist.account, specialist_participant.account, user_participant.account])
      end
    end

    context "when the interview doesn't have a legacy specialist" do
      it "returns the participant with a specialist" do
        interview.update!(specialist: nil)
        expect(interview.specialist).to eq(specialist_participant)
        expect(interview.participants).to match_array([specialist_participant.account, user_participant.account])
      end
    end

    context "when the legacy specialist and specialist participant are the same account" do
      let(:specialist_participant) { specialist }

      it "returns it only once in #participants" do
        expect(interview.specialist).to eq(specialist)
        expect(interview.participants).to match_array([specialist.account, user_participant.account])
      end
    end
  end

  describe "#user" do
    let(:user) { create(:user) }
    let(:interview) { create(:interview, user:, specialist: nil) }
    let(:specialist_participant) { create(:specialist) }
    let(:user_participant) { create(:user) }

    before do
      create(:interview_participant, interview:, account: user_participant.account)
      create(:interview_participant, interview:, account: specialist_participant.account)
    end

    context "when the interview has a legacy user" do
      it "returns the legacy user" do
        expect(interview.user).to eq(user)
        expect(interview.participants).to match_array([user.account, specialist_participant.account, user_participant.account])
      end
    end

    context "when the interview doesn't have a legacy user" do
      it "returns the participant with a user" do
        interview.update!(user: nil)
        expect(interview.user).to eq(user_participant)
        expect(interview.participants).to match_array([specialist_participant.account, user_participant.account])
      end
    end

    context "when the legacy user and user participant are the same account" do
      let(:user_participant) { user }

      it "returns it only once in #participants" do
        expect(interview.user).to eq(user)
        expect(interview.participants).to match_array([specialist_participant.account, user.account])
      end
    end
  end
end
