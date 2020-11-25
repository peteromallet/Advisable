require "rails_helper"

RSpec.describe Company, type: :model do
  describe ".fresh_name_for" do
    let(:user) { create(:user, company_name: "Acme") }

    it "returns the same name as user's company" do
      expect(described_class.fresh_name_for(user.company_name)).to eq("Acme")
    end

    context "when company with that name already exists" do
      it "returns the same name as user's company with (2)" do
        create(:company, name: "Acme")
        expect(described_class.fresh_name_for(user.company_name)).to eq("Acme (2)")
      end

      it "returns the same name as user's company with a bigger number in parenthesis" do
        create(:company, name: "Acme")
        create(:company, name: "Acme (2)")
        expect(described_class.fresh_name_for(user.company_name)).to eq("Acme (3)")
      end
    end
  end
end
