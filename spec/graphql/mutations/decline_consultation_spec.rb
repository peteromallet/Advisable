require 'rails_helper'

RSpec.describe Mutations::DeclineConsultation do
  let!(:consultation) { create(:consultation, status: 'Request Started') }

  let(:query) do
    <<-GRAPHQL
    mutation {
      declineConsultation(input: {
        consultation: "#{consultation.uid}"
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it "sets the consultation status to 'Specialist Rejected'" do
    expect { AdvisableSchema.execute(query) }.to change {
      consultation.reload.status
    }.from('Request Started')
      .to('Specialist Rejected')
  end
end
