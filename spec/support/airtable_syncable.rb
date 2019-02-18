RSpec.shared_examples "Airtable::Syncable" do
  describe "#sync_changes_to_airtable" do
    it "is false by default" do
      inst = described_class.new
      expect(inst.sync_changes_to_airtable).to be_falsey
    end

    it "can be set to true" do
      inst = described_class.new
      expect {
        inst.sync_changes_to_airtable = true
      }.to change { inst.sync_changes_to_airtable }.from(false).to(true)
    end
  end

  context "when the record already exists" do
    it "calls #push on the airtable record" do
      inst = create(described_class.to_s.underscore.to_sym, airtable_id: "123")
      airtable_class = "Airtable::#{described_class.to_s}".constantize
      airtable_record = double(airtable_class)
      expect(airtable_record).to receive(:push).with(inst)
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
      expect(airtable_record).to receive(:push).with(inst)
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
