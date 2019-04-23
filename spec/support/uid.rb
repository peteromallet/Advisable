RSpec.shared_examples "uid" do
  let(:model) { described_class }

  it "can generate a UID" do
    expect(model.generate_uid).to_not be_nil
  end

  it "generates a UID before validation" do
    record = model.new
    expect(record.uid).to be_nil
    record.valid?
    expect(record.uid).to_not be_nil
  end

  it "does not generate a new UID if the record has already been saved" do
    factory = model.to_s.underscore.to_sym
    record = FactoryBot.create(factory)
    expect(record.uid).to_not be_nil
    before = record.uid
    record.valid?
    expect(record.uid).to eq(before)
  end
end
