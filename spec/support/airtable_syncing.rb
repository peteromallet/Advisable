RSpec.shared_examples "airtable syncing" do
  subject {
    described_class.new({}, id: "rec_1")
  }

  it "has a table_name" do
    expect(described_class.table_name).to_not be_nil
  end

  it "has a sync_model" do
    expect(described_class.sync_model).to be < ActiveRecord::Base
  end

  describe "after_sync" do
    
  end
end

RSpec.shared_examples "sync airtable column" do |column, config|
  it "sync the #{column} column to #{config[:to]}" do
    factory = described_class.sync_model.to_s.underscore
    record = build(factory)
    record.send("#{config[:to]}=", nil)
    record.save(validate: false)
    data_type = described_class.sync_model.column_for_attribute(config[:to]).type
    value = config[:with] || (airtable_fields ? airtable_fields[column] : change_value(data_type))

    airtable = described_class.new(airtable_fields || { column => value }, id: record.airtable_id)
    expect { airtable.sync }.to change {
      record.reload.send(config[:to])
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
  it "syncs the '#{column}' column to the #{config[:to]} association" do
    factory = described_class.sync_model.to_s.underscore
    record = build(factory)
    record.send("#{config[:to]}=", nil)
    record.save(validate: false)

    reflection = described_class.sync_model.reflect_on_association(config[:to])
    association_factory = reflection.class_name.to_s.underscore
    association = create(association_factory)

    airtable = described_class.new({
      column => [association.airtable_id]
    }, id: record.airtable_id)

    expect(record.send(config[:to])).to be_nil
    airtable.sync
    expect(record.reload.send(config[:to])).to_not be_nil
  end

  it "syncs the associated #{config[:to]} if it doesnt exist" do
    factory = described_class.sync_model.to_s.underscore
    record = build(factory)
    record.send("#{config[:to]}=", nil)
    record.save(validate: false)

    reflection = described_class.sync_model.reflect_on_association(config[:to])
    association_airtable = "Airtable::#{reflection.class_name}".constantize
    double = double(association_airtable)
    expect(association_airtable).to receive(:find).and_return(double)
    expect(double).to receive(:sync)

    airtable = described_class.new({column => ["rec_12345"]}, id: record.airtable_id)
    airtable.sync
  end
end