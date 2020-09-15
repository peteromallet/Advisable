require 'rails_helper'

RSpec.describe Mutations::SendConsultationRequest do
  let!(:consultation) do
    create(:consultation, status: 'Request Started', topic: nil)
  end

  let(:topic) { 'New topic' }

  let(:query) do
    <<~GQL
      mutation {
        updateConsultation(input: {
          id: "#{consultation.uid}",
          topic: "#{topic}"
        }) {
          consultation {
            id
            topic
          }
        }
      }
    GQL
  end

  before :each do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it 'sets the topic' do
    expect { AdvisableSchema.execute(query) }.to change {
      consultation.reload.topic
    }.from(nil)
      .to('New topic')
  end

  context "when the status is 'Accepted by Specialist'" do
    let!(:consultation) do
      create(:consultation, status: 'Accepted by Specialist')
    end

    it 'returns an error' do
      response = AdvisableSchema.execute(query)
      error = response['errors'].first['extensions']['code']
      expect(error).to eq('consultations.failedToUpdate')
    end
  end
end
