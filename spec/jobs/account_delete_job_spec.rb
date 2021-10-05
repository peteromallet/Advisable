# frozen_string_literal: true

require "rails_helper"

RSpec.describe AccountDeleteJob do
  it "deletes accounts marked for deletion in the past 14 days" do
    fresh = create(:specialist, account: create(:account, deleted_at: 13.days.ago))
    stale = create(:specialist, account: create(:account, deleted_at: 15.days.ago))

    allow_any_instance_of(Specialist).to receive(:remove_from_airtable)
    described_class.perform_now

    expect(Specialist.find_by(id: fresh.id)).not_to be_nil
    expect(Specialist.find_by(id: stale.id)).to be_nil
  end
end
