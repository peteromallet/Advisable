require 'rails_helper'

RSpec.describe Specialist do
  include_examples "uid"

  it { should have_many(:applications) }
  it { should have_many(:skills).through(:specialist_skills) }

  describe "#has_setup_payments" do
    it 'returns false if there is no bank_holder_name' do
      specialist = build(:specialist, bank_holder_name: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns false if there is no bank_holder_address' do
      specialist = build(:specialist, bank_holder_address: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns false if there is no bank_currency' do
      specialist = build(:specialist, bank_currency: nil)
      expect(specialist.has_setup_payments).to be_falsey
    end

    it 'returns true if they have provided all payment info' do
      specialist = build(:specialist, {
        bank_currency: "EUR",
        bank_holder_name: "Test Account",
        bank_holder_address: {
          "line1" => "line1",
          "line2" => "line2",
          "city" => "city",
          "state" => "state",
          "country" => "country",
          "postcode" => "postcode",
        }
      })
      expect(specialist.has_setup_payments).to be_truthy
    end
  end

  context "guild" do
    let(:specialist) { create(:specialist) }

    describe "guild_joined_date" do
      it "sets a date when a specialist joins the guild" do
        expect {
          specialist.update!(guild: true)
        }.to change(specialist.reload, :guild_joined_date)
      end

      it "does not overwrite the original date" do
        specialist.update!(guild: true)
        expect {
          specialist.update!(guild: false)
        }.to_not change(specialist.reload, :guild_joined_date)
      end
    end

    describe "guild_featured_member_at" do
      let!(:spe_featured) { create(:specialist, :guild, guild_featured_member_at: Time.current) }
      let!(:spe_not_featured) { create(:specialist, :guild) }
      let!(:spe_non_guild) { create(:specialist) }

      subject(:guild_feature_members) {
        Specialist.guild_featured_members
      }

      it "only includes guild members who have the respective datetime" do
        expect(subject.count).to eq(1)
        expect(subject).to include(spe_featured)
      end
    end
  end
end
