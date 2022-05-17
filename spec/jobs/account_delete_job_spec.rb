# frozen_string_literal: true

require "rails_helper"

RSpec.describe AccountDeleteJob do
  it "deletes accounts marked for deletion in the past 14 days" do
    fresh_specialist = create(:specialist, account: create(:account, deleted_at: 13.days.ago))
    stale_specialist = create(:specialist, account: create(:account, deleted_at: 15.days.ago))
    fresh_user = create(:user, account: create(:account, deleted_at: 13.days.ago))
    stale_user = create(:user, account: create(:account, deleted_at: 15.days.ago))

    allow_any_instance_of(Specialist).to receive(:remove_from_airtable)
    allow_any_instance_of(User).to receive(:remove_from_airtable)

    expect_any_instance_of(::Analytics).to receive(:suppress_and_delete).with(match_array([stale_user.account.uid, stale_specialist.account.uid]))
    described_class.perform_now

    expect(Specialist.find_by(id: fresh_specialist.id)).not_to be_nil
    expect(Specialist.find_by(id: stale_specialist.id)).to be_nil
    expect(User.find_by(id: fresh_user.id)).not_to be_nil
    expect(User.find_by(id: stale_user.id)).to be_nil
  end
end
