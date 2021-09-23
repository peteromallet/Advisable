# frozen_string_literal: true

require 'rails_helper'

RSpec.describe(Mutations::SubmitClientApplication) do
  let(:application_status) { "Application Started" }
  let(:user) { create(:user, application_status: application_status) }
  let(:context) { {current_user: user} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        submitClientApplication(input: {}) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL
  end

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  def request
    AdvisableSchema.execute(query, context: context)
  end

  it 'Sets the status to Submitted' do
    expect { request }.to change {
      user.reload.application_status
    }.from("Application Started").to("Submitted")
  end

  it 'syncs to airtable' do
    expect_any_instance_of(User).to receive(:sync_to_airtable)
    request
  end

  context "when the application_status is not 'Application Started'" do
    let(:application_status) { "Submitted" }

    it "returns an error" do
      error = request["errors"][0]["extensions"]["code"]
      expect(error).to eq("APPLICATION_NOT_STARTED")
    end
  end
end
