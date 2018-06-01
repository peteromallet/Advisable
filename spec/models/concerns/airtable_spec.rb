require "rails_helper"

describe Airtable do
  describe "self.sync" do
    it "calls #sync on each descendant of Airtable::Base" do
      Rails.application.eager_load!
      Airtable::Base.descendants.each do |table|
        expect(table).to receive(:sync)
      end

      Airtable.sync
    end
  end
end
