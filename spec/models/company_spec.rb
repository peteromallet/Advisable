require "rails_helper"

RSpec.describe Company, type: :model do
  describe ".fresh_company_name_for" do
    let(:user) { create(:user, company_name: "Acme") }

    it "returns the same name as user's company" do
      expect(described_class.fresh_company_name_for(user)).to eq("Acme")
    end

    context "when company with that name already exists" do
      it "returns the same name as user's company with (2)" do
        create(:company, name: "Acme")
        expect(described_class.fresh_company_name_for(user)).to eq("Acme (2)")
      end

      it "returns the same name as user's company with a bigger number in parenthesis" do
        create(:company, name: "Acme")
        create(:company, name: "Acme (2)")
        expect(described_class.fresh_company_name_for(user)).to eq("Acme (3)")
      end
    end
  end

  describe ".create_for_user" do
    let(:industry) { create(:industry) }
    let(:sales_person) { create(:sales_person) }
    let(:user) { create(:user, company_name: "Acme", company_type: "Startup", sales_person: sales_person, industry: industry) }

    it "copies things over from user" do
      described_class.create_for_user(user)
      expect(user.company.attributes.slice("name", "kind", "sales_person_id", "industry_id").values).to match_array(["Acme", "Startup", user.sales_person_id, user.industry_id])
    end
  end
end
