require "rails_helper"

describe Airtable::OffPlatformProject do
  include_examples "sync airtable association", "Specialist", to: :specialist

  context 'when Okay with naming client is Yes' do
    it 'sets confidential to false' do
      record = create(:off_platform_project, confidential: true)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => "Yes"
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(true).to(false)
    end
  end

  context 'when Okay with naming client is blank' do
    it 'sets confidential to true' do
      record = create(:off_platform_project, confidential: false)
      airtable = Airtable::OffPlatformProject.new({
        "Okay with naming client" => nil
      }, id: record.airtable_id)
      expect { airtable.sync }.to change {
        record.reload.confidential
      }.from(false).to(true)
    end
  end
end