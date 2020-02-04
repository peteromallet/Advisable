require 'rails_helper'

describe Mutations::SendConsultationRequest do
  let(:skill) { create(:skill) }
  let(:topic) { 'This is the topic' }
  let(:specialist1) { create(:specialist) }
  let(:specialist2) { create(:specialist) }
  let(:user) { create(:user) }
  let(:context) { { current_user: user } }

  let(:query) do
    <<~GQL
      mutation {
        requestConsultations(input: {
          skill: "#{skill.name}",
          topic: "#{topic}",
          specialists: ["#{specialist1.uid}", "#{specialist2.uid}"]
        }) {
          consultations {
            id
          }
        }
      }
    GQL
  end

  before :each do
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
  end

  it 'creates a consultation record for each specialist' do
    expect { AdvisableSchema.execute(query, context: context) }.to change {
      Consultation.all.count
    }.from(0)
      .to(2)
  end

  context 'when there is no user logged in' do
    let(:context) { {} }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notAuthenticated')
    end
  end

  context 'when the viewer is a specialist' do
    let(:user) { create(:specialist) }

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('viewerIsSpecialist')
    end
  end
end
