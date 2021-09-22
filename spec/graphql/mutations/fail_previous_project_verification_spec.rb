# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::FailPreviousProjectVerification do
  let(:contact_name) { "John Doe" }
  let(:previous_project) do
    create(:previous_project, {
      validation_status: "Pending",
      contact_first_name: contact_name.split.first,
      contact_last_name: contact_name.split.last
    })
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      failPreviousProjectVerification(input: {
        previousProject: "#{previous_project.uid}",
        reason: "testing"
      }) {
        previousProject {
          id
          validationStatus
        }
      }
    }
    GRAPHQL
  end

  let(:viewer_name) { "John Doe" }

  let(:oauth_viewer) do
    OauthViewer.new(
      {
        'uid' => 'test',
        'name' => viewer_name,
        'provider' => 'linkedin',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'image' => ''
      }
    )
  end

  let(:request) do
    AdvisableSchema.execute(query, context: {oauth_viewer: oauth_viewer})
  end

  it 'sets the validation_status to "Validation Failed" and saves the reason' do
    expect { request }.to change {
      previous_project.reload.validation_status
    }.from("Pending").to("Validation Failed")
    expect(previous_project.validation_failed_reason).to eq("testing")
  end

  context 'when the viewer is not the project contact' do
    let(:contact_name) { "Other Person" }

    it 'does not change the validation status' do
      expect { request }.not_to(change { previous_project.reload.validation_status })
    end
  end
end
