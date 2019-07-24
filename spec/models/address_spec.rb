require 'rails_helper'

describe Address do
  describe "#to_s" do
    it "outputs the address" do
      address = Address.new({
        "line1" => "line1",
        "line2" => "line2",
        "city" => "city",
        "state" => "state",
        "country" => "IE",
        "postcode" => "postcode"
      })
      expect(address.to_s).to eq("line1,\nline2,\ncity,\nstate,\nIE,\npostcode")
    end

    context 'when there is no line2' do
      it 'exlcudes it from the outputted address' do
        address = Address.new({
          "line1" => "line1",
          "city" => "city",
          "state" => "state",
          "country" => "IE",
          "postcode" => "postcode"
        })
        expect(address.to_s).to eq("line1,\ncity,\nstate,\nIE,\npostcode")
      end
    end
  end

  describe "#to_h" do
    it "outputs the address as a hash" do
        address = Address.new({
          "line1" => "line1",
          "line2" => "line2",
          "city" => "city",
          "state" => "state",
          "country" => "IE",
          "postcode" => "postcode"
        })
        expect(address.to_h).to eq({ 
          "line1" => "line1",
          "line2" => "line2",
          "city" => "city",
          "state" => "state",
          "country" => "IE",
          "postcode" => "postcode"
        })
    end
  end

  describe "self.parse" do
    it 'parses a given address' do
      expect(Address).to receive(:new).with({
        "line1" => "line1",
        "line2" => "line2",
        "city" => "city",
        "state" => "state",
        "country" => "IE",
        "postcode" => "postcode"
      })
      Address.parse("line1,\nline2,\ncity,\nstate,\nIE,\npostcode")
    end

    context 'when there is no line2' do
      it 'still parses the address correctly' do
        expect(Address).to receive(:new).with({
          "line1" => "line1",
          "line2" => nil,
          "city" => "city",
          "state" => "state",
          "country" => "IE",
          "postcode" => "postcode"
        })
        Address.parse("line1,\ncity,\nstate,\nIE,\npostcode")
      end
    end
  end
end