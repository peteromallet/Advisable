RSpec.shared_examples "Airtable::Syncable" do
  context "#remove_from_airtable" do
    it "deletes the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym)
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_class).to receive(:find).with(inst.airtable_id).and_return(airtable_record)
      expect(airtable_record).to receive(:destroy)
      inst.remove_from_airtable
    end
  end

  describe "#sync_from_airtable" do
    it "syncs the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym)
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_class).to receive(:find).with(inst.airtable_id).and_return(airtable_record)
      expect(airtable_record).to receive(:sync)
      inst.sync_from_airtable
    end
  end

  context "when the record already exists" do
    it "calls #push on the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym, airtable_id: "123")
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_record).to receive(:push).with(inst, {})
      expect(airtable_class).to receive(:find).and_return(airtable_record)
      inst.sync_changes_to_airtable = true
      inst.save
    end
  end

  context "when the record is new" do
    it "calls #push on the airtable record" do
      inst = build(described_class.to_s.underscore.to_sym, airtable_id: nil)
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_record).to receive(:push).with(inst, {})
      expect(airtable_class).to receive(:new).with({}).and_return(airtable_record)
      inst.sync_changes_to_airtable = true
      inst.save
    end
  end

  context "when sync_changes_to_airtable is false" do
    it "does not sync with airtable" do
      inst = create(described_class.to_s.underscore.to_sym, airtable_id: "1234")
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_record).not_to receive(:push).with(inst)
      expect(airtable_class).not_to receive(:find).with("1234")
      inst.sync_changes_to_airtable = false
      inst.save
    end
  end
end
