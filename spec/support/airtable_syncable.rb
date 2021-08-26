# frozen_string_literal: true

RSpec.shared_examples("Airtable::Syncable") do
  describe "#remove_from_airtable" do
    it "deletes the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym)
      airtable_class = "Airtable::#{described_class}".constantize
      airtable_record = instance_double(airtable_class)
      allow(airtable_class).to receive(:find).with(inst.airtable_id).and_return(airtable_record)
      expect(airtable_record).to receive(:destroy)
      inst.remove_from_airtable
    end
  end

  describe "#sync_from_airtable" do
    it "syncs the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym)
      airtable_class = "Airtable::#{described_class}".constantize
      airtable_record = instance_double(airtable_class)
      allow(airtable_class).to receive(:find).with(inst.airtable_id).and_return(airtable_record)
      expect(airtable_record).to receive(:sync)
      inst.sync_from_airtable
    end
  end

  describe "#save_and_sync!" do
    context "when the record already exists" do
      it "calls #push on the airtable record" do
        inst = create(described_class.to_s.underscore.to_sym, airtable_id: "123")
        inst.save_and_sync!
        expect(AirtableSyncJob).to have_been_enqueued.with(inst, anything)
      end
    end

    context "when the record is new" do
      it "calls #push on the airtable record" do
        inst = build(described_class.to_s.underscore.to_sym, airtable_id: nil)
        inst.save_and_sync!
        expect(AirtableSyncJob).to have_been_enqueued.with(inst, anything)
      end
    end
  end
end
