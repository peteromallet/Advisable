# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreatePreviousProject do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:context) { {current_user: current_user} }

  let!(:advertising) { create(:industry, name: "Advertising") }
  let!(:computing) { create(:industry, name: "Computing") }
  let(:industries) { [advertising.name, computing.name] }
  let(:primary_industry) { advertising.name }

  let(:client_name) { "Dunder Mifflen" }
  let(:confidential) { false }
  let(:company_type) { "Startup" }

  let(:query) do
    <<~GRAPHQL
      mutation {
        createPreviousProject(input: {
          specialist: "#{specialist.uid}",
          clientName: "#{client_name}",
          confidential: #{confidential},
          industries: #{industries},
          primaryIndustry: "#{primary_industry}"
          companyType: "#{company_type}",
        }) {
          previousProject {
            id
            clientName
          }
        }
      }
    GRAPHQL
  end

  it "creates a new previous project for the specialist" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      specialist.previous_projects.count
    }.by(1)
  end

  it "sets the client name" do
    AdvisableSchema.execute(query, context: context)
    project = PreviousProject.last
    expect(project.client_name).to eq(client_name)
  end

  context "when confidential is true" do
    let(:confidential) { true }

    it "marks the project as confidential" do
      AdvisableSchema.execute(query, context: context)
      project = PreviousProject.last
      expect(project.confidential).to be_truthy
    end
  end

  it "creates industry records for the project" do
    AdvisableSchema.execute(query, context: context)
    project = PreviousProject.last
    expect(project.industries).to include(advertising)
    expect(project.industries).to include(computing)
  end

  it "sets the primary industry" do
    AdvisableSchema.execute(query, context: context)
    project = PreviousProject.last
    expect(project.primary_industry).to eq(advertising)
  end

  it "sets the company type" do
    AdvisableSchema.execute(query, context: context)
    project = PreviousProject.last
    expect(project.company_type).to eq(company_type)
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
