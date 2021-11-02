# frozen_string_literal: true

RSpec.shared_examples("uid") do
  let(:model) { described_class }
  let(:factory) { described_class.table_name.singularize.to_sym }
  let(:record) { create(factory) }

  it "can generate a UID" do
    expect(model.generate_uid).not_to(be_nil)
  end

  it "generates a UID before validation" do
    record = model.new
    expect(record.uid).to be_nil
    record.valid?
    expect(record.uid).not_to(be_nil)
  end

  it "does not generate a new UID if the record has already been saved" do
    expect(record.uid).not_to(be_nil)
    before = record.uid
    record.valid?
    expect(record.uid).to eq(before)
  end

  it "can tell whether a uid is valid" do
    expect(model).not_to be_valid_uid("asd_1234")
    expect(model).to be_valid_uid(model.generate_uid)
  end
end
