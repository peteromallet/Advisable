require "rails_helper"

RSpec.describe Airtable do
  describe "self.sync" do
    it "calls #sync on each descendant of Airtable::Base" do
      Zeitwerk::Loader.eager_load_all
      Airtable::Base.descendants.each do |table|
        expect(table).to receive(:sync)
      end

      Airtable.sync
    end
  end
end
