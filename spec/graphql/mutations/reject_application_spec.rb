# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::RejectApplication do
  let(:application) { create(:application, status: "Applied") }
  let(:message) { "" }
  let(:query) do
    <<-GRAPHQL
      mutation {
        rejectApplication(input: {
          id: "#{application.uid}",
          message: "#{message}"
        }) {
          application {
            id
            status
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user: application.project.user} }

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  def request
    AdvisableSchema.execute(query, context: context)
  end

  it "sets the status to ApplicationRejected" do
    expect { request }.to change {
      application.reload.status
    }.from("Applied").to("Application Rejected")
  end

  context "when a message argument is provided" do
    let(:message) { "Not sure you have what it takes to be assistant to the regional manager" }

    it "sends the specialist a message" do
      request
      message_record = Message.last
      expect(message_record.content).to eq(message)
    end
  end

  context "when not logged in" do
    let(:context) { {current_user: nil} }

    it "returns an error if the user is not logged in" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when logged in as a random user" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error if the user is not logged in" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthorized")
    end
  end
end
