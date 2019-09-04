require 'rails_helper'

class AirtableTable < Airtable::Base
end

describe Airtable::Base do
  let(:record) { AirtableTable.new({}) }

  describe 'self.sync' do
    it 'interates through all of the records calling #sync on them' do
      a = OpenStruct.new(sync: true)
      b = OpenStruct.new(sync: true)
      allow(Airtable::Base).to receive(:all).and_return([a, b])
      expect(a).to receive(:sync)
      expect(b).to receive(:sync)
      Airtable::Base.sync
    end
  end

  describe "#base_key" do
    it "returns the AIRTABLE_DATABASE_KEY" do
      expect(AirtableTable.base_key).to eq(ENV["AIRTABLE_DATABASE_KEY"])
    end
  end

  describe "#columns_hash" do
    it "returns the @columns_hash instance variable" do
      hash = { foo: "bar" }
      AirtableTable.instance_variable_set(:@columns_hash, hash)
      expect(AirtableTable.columns_hash).to eq(hash)
    end

    context "when @columns_hash is nil" do
      it "returns a hash" do
        AirtableTable.instance_variable_set(:@columns_hash, nil)
        expect(AirtableTable.columns_hash).to eq({})
      end
    end
  end

  describe "#associations" do
    it "returns the @associations instance variable" do
      hash = { foo: "bar" }
      AirtableTable.instance_variable_set(:@associations, hash)
      expect(AirtableTable.associations).to eq(hash)
    end

    context "when @associations is nil" do
      it "returns a hash" do
        AirtableTable.instance_variable_set(:@associations, nil)
        expect(AirtableTable.associations).to eq({})
      end
    end
  end

  describe "#sync_with" do
    it "sets the @sync_model instance variable" do
      AirtableTable.instance_variable_set(:@sync_model, nil)
      expect(AirtableTable.instance_variable_get(:@sync_model)).to be_nil
      AirtableTable.sync_with(Specialist)
      expect(AirtableTable.instance_variable_get(:@sync_model)).to eq(Specialist)
    end
  end

  describe "#sync_column" do
    it "maps an airtable column to a local column by storing it in a hash" do
      expect(AirtableTable.columns_hash['Testing']).to be_nil
      AirtableTable.sync_column "Testing", to: :testing
      expect(AirtableTable.columns_hash['Testing']).to eq(:testing)
    end
  end

  describe "#sync_association" do
    it "maps an airtable association to a local one by storing it in a hash" do
      expect(AirtableTable.associations['User']).to be_nil
      AirtableTable.sync_association "User", to: :user
      expect(AirtableTable.associations['User']).to eq({ to: :user })
    end
  end
end