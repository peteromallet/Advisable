# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::PublishPreviousProject do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:context) { {current_user: current_user} }

  let(:project) { create(:previous_project, specialist: specialist, draft: true, contact_first_name: nil, contact_last_name: nil, contact_job_title: nil, contact_relationship: nil) }
  let(:contact_name) { "John Doe" }
  let(:contact_job_title) { "CEO" }
  let(:contact_relationship) { "Managed the project" }

  let(:query) do
    <<~GRAPHQL
      mutation {
        publishPreviousProject(input: {
          previousProject: "#{project.uid}",
          contactName: "#{contact_name}",
          contactJobTitle: "#{contact_job_title}",
          contactRelationship: "#{contact_relationship}",
        }) {
          previousProject {
            id
          }
        }
      }
    GRAPHQL
  end

  it "sets draft to false" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.draft
    }.from(true).to(false)
  end

  it "sets the contact name" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.contact_name
    }.from(nil).to("John Doe")
  end

  it "sets the contact job title" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.contact_job_title
    }.from(nil).to("CEO")
  end

  it "sets the contact relationship" do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      project.reload.contact_relationship
    }.from(nil).to("Managed the project")
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
