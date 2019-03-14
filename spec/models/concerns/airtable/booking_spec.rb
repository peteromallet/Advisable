require "rails_helper"

describe Airtable::Booking do
  include_examples "sync airtable column", "Type", to: :type
  include_examples "sync airtable column", "Rate", to: :rate
  include_examples "sync airtable column", "Rate Type", to: :rate_type
  include_examples "sync airtable column", "Rate Limit", to: :rate_limit
  include_examples "sync airtable column", "Duration", to: :duration
  include_examples "sync airtable column", "Decline Comment", to: :decline_comment
  include_examples "sync airtable column", "Proposal Comment", to: :proposal_comment
  include_examples "sync airtable column", "Client Decline Comment", to: :client_decline_comment
  include_examples "sync airtable association", "Application", to: :application

  it 'syncs the status' do
      record = create(:booking, status: nil)
      airtable = Airtable::Booking.new({
        "Status" => "Proposed"
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.status
      }.from(nil).to("Proposed")
  end
end