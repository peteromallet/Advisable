RSpec.shared_examples "airtable syncing" do |config = {}|
  let(:factory) { described_class.sync_model.to_s.underscore }

  it "has a table_name" do
    expect(described_class.table_name).to_not be_nil
  end

  it "has a sync_model" do
    expect(described_class.sync_model).to be < ActiveRecord::Base
  end

  describe "self.base_key" do
    it 'returns the AIRTABLE_DATABASE_KEY' do
      expect(described_class.base_key).to eq(ENV["AIRTABLE_DATABASE_KEY"])
    end
  end

  describe "self.sync" do
    it "calls sync on each record returned by #all" do
      a = described_class.new({})
      b = described_class.new({})
      allow(described_class).to receive(:all).and_return([a, b])
      expect(a).to receive(:sync)
      expect(b).to receive(:sync)
      described_class.sync
    end

    it "can pass through a filter" do
      filter = "TEST"
      expect(described_class).to receive(:all).with(filter: filter).and_return([])
      described_class.sync(filter: filter)
    end

    it "accepts a report object and passes it to each #sync call" do
      report = OpenStruct.new
      record = described_class.new({})
      expect(described_class).to receive(:all).and_return([record])
      expect(record).to receive(:sync).with(report)
      described_class.sync(report)
    end
  end

  describe "#model" do
    it "returns the active record model with matching airtable id" do
      active_record_model = create(factory)
      record = described_class.new({}, id: active_record_model.airtable_id)
      expect(record.model).to eq(active_record_model)
    end
  end

  describe "#sync" do
    let(:fields) { config[:fields] || {} }
    let(:active_record_model) { create(factory) }
    let(:record) { described_class.new(fields, id: active_record_model.airtable_id) }

    # Generate a test for each of the column_hash attributes.
    described_class.columns_hash.each do |column, attribute|
      it "syncs the '#{column}' column to the '#{attribute}' attribute" do
        active_record_model = build(factory, {attribute => nil})
        active_record_model.save(validate: false)
        record = described_class.new({
          column => "test"
        }, id: active_record_model.airtable_id)
        allow(record).to receive(:model).and_return(active_record_model)
        expect(active_record_model).to receive("#{attribute}=").with("test")
        record.sync
      end
    end

    it "calls Webhook.process" do
      allow(record).to receive(:model).and_return(active_record_model)
      allow(active_record_model).to receive(:save).and_return(true)
      expect(Webhook).to receive(:process).with(active_record_model)
      record.sync
    end

    context "when the model fails to save" do
      it "logs a warning" do
        active_record_model = create(factory)
        record = described_class.new({}, id: active_record_model.airtable_id)
        allow(record).to receive(:model).and_return(active_record_model)
        allow(active_record_model).to receive(:save).and_return(false)
        expect(Rails.logger).to receive(:warn).with(/Failed to sync/).at_least(:once)
        record.sync
      end
    end
  end
end

RSpec.shared_examples "sync airtable column" do |column, config|
  it "sync the #{column} column to #{config[:to]}" do
    factory = described_class.sync_model.to_s.underscore
    record = build(factory)
    record.public_send("#{config[:to]}=", nil)
    record.save(validate: false)
    data_type = described_class.sync_model.column_for_attribute(config[:to]).type
    value = config[:with] || (airtable_fields ? airtable_fields[column] : change_value(data_type))

    airtable = described_class.new(airtable_fields || {column => value}, id: record.airtable_id)
    expect { airtable.sync }.to change {
      record.reload.public_send(config[:to])
    }.from(nil).to(value)
  end

  def airtable_fields
    defined?(fields) ? fields : nil
  end

  def change_value(type)
    return 10 if type == :decimal

    "test"
  end
end

RSpec.shared_examples "sync airtable association" do |column, config|
  let(:factory) { described_class.sync_model.to_s.underscore }
  let(:record) { build(factory) }
  let(:default_fields) { config[:fields] || {} }

  it "syncs the '#{column}' column to the #{config[:to]} association" do
    record.public_send("#{config[:to]}=", nil)
    record.save(validate: false)

    reflection = described_class.sync_model.reflect_on_association(config[:to])
    association_factory = reflection.class_name.to_s.underscore
    association = create(association_factory)

    fields = default_fields.merge(column => [association.airtable_id])
    airtable = described_class.new(fields, id: record.airtable_id)

    expect(record.public_send(config[:to])).to be_nil
    airtable.sync
    expect(record.reload.public_send(config[:to])).to_not be_nil
  end

  it "syncs the associated #{config[:to]} if it doesnt exist" do
    record.public_send("#{config[:to]}=", nil)
    record.save(validate: false)

    reflection = described_class.sync_model.reflect_on_association(config[:to])
    association_airtable = "Airtable::#{reflection.class_name}".constantize
    double = double(association_airtable)
    expect(association_airtable).to receive(:find).and_return(double)
    expect(double).to receive(:sync)

    fields = default_fields.merge(column => ["rec_12345"])
    airtable = described_class.new(fields, id: record.airtable_id)
    airtable.sync
  end
end

RSpec.shared_examples "sync airtable columns to association" do |config|
  let(:data) { config[:columns].map { |c| [c[:from], c[:with]] }.to_h }
  let!(:record) { create(described_class.sync_model.to_s.underscore) }
  let(:airtable) { described_class.new(data, id: record.airtable_id) }

  config[:columns].each do |column|
    it "sync the #{config[:association]} #{column[:from]} column to #{column[:to]}" do
      airtable.sync
      expect(record.public_send(config[:association]).reload.public_send(column[:to])).to eq(column[:with])
    end
  end
end
