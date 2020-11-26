require "rails_helper"

RSpec.describe Mutations::CreateUserForCompany do
  let(:context) { {current_user: create(:user, :team_manager)} }
  let(:company) { create(:company) }
  let(:email) { Faker::Internet.email }
  let(:first_name) { Faker::Name.first_name }
  let(:last_name) { Faker::Name.last_name }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createUserForCompany(input: {
        companyId: "#{company.id}",
        email: "#{email}",
        firstName: "#{first_name}",
        lastName: "#{last_name}",
      }) {
        user {
          id
          company {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it "creates a new user on the company" do
    response = AdvisableSchema.execute(query, context: context)
    uid = response["data"]["createUserForCompany"]["user"]["id"]
    created_user = User.find_by(uid: uid)
    expect(created_user.account.attributes.slice("email", "first_name", "last_name").values).to match_array([email, first_name, last_name])
    expect(created_user.company_id).to eq(company.id)
  end

  context "when no team manager permission" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end

  context "when provided a blacklisted email" do
    let(:email) { "test@gmail.com" }

    it "returns an error" do
      create(:blacklisted_domain, domain: "gmail.com")
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("nonCorporateEmail")
    end
  end

  context "when provided an email that is already taken" do
    it "returns an error" do
      create(:user, account: create(:account, email: email))
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("emailTaken")
    end
  end

  context "when no email" do
    let(:email) { "" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("emailBlank")
    end
  end
end
