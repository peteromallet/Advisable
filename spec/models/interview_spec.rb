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
end
