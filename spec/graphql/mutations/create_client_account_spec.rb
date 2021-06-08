# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(Mutations::CreateClientAccount) do
  let(:first_name) { 'Test' }
  let(:last_name) { 'Account' }
  let(:email) { 'test@test.com' }
  let(:session_manager) do
    SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new)
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      createClientAccount(input: {
        firstName: "#{first_name}",
        lastName: "#{last_name}",
        email: "#{email}",
      }) {
        viewer {
          ... on User {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before do
    allow(session_manager).to receive(:login)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  def request
    AdvisableSchema.execute(
      query,
      context: {session_manager: session_manager}
    )
  end

  it "creates a new user account" do
    expect { request }.to change(Account, :count).by(1)
    account = Account.last
    expect(account.first_name).to eq(first_name)
    expect(account.last_name).to eq(last_name)
    expect(account.email).to eq(email)
    expect(account.permissions).to include("team_manager")
  end

  it "creates a new user" do
    expect { request }.to change(User, :count).by(1)
  end

  it "creates a new company" do
    expect { request }.to change(Company, :count).by(1)
  end

  it "logs in the new account" do
    request
    expect(session_manager).to have_received(:login)
  end

  context "when the email is already taken" do
    it "returns an error" do
      create(:account, email: email)
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("EMAIL_TAKEN")
    end
  end

  context "when the email is blacklisted" do
    let(:email) { "test@gmail.com" }

    it "returns an error" do
      create(:blacklisted_domain, domain: "gmail.com")
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("NON_CORPORATE_EMAIL")
    end
  end
end
