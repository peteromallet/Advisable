require 'rails_helper'

RSpec.describe Mutations::SubmitClientApplication do
  let(:user) { create(:user, application_status: :started) }
  let(:query) do
    <<-GRAPHQL
      mutation {
        submitClientApplication(input: {
          id: "#{user.uid}",
          talentQuality: "good",
          localityImportance: 1,
          acceptedGuaranteeTerms: true
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'Sets the status to accepted' do
    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.application_status
    }.from(:started).to(:accepted)
  end

  context 'when they select cheap talent' do
    let(:query) do
      <<-GRAPHQL
        mutation {
          submitClientApplication(input: {
            id: "#{user.uid}",
            talentQuality: "cheap",
            localityImportance: 1,
            acceptedGuaranteeTerms: true
          }) {
            clientApplication {
              id
            }
          }
        }
      GRAPHQL
    end

    it 'Sets the status to rejected with a reason' do
      AdvisableSchema.execute(query)
      expect(user.reload.application_status).to eq(:rejected)
      expect(user.reload.rejection_reason).to eq('cheap_talent')
    end
  end

  context 'when they select not hiring any freelancers' do
    let(:user) do
      create(:user, application_status: :started, number_of_freelancers: '0')
    end

    it 'sets the status to rejected with a reason' do
      AdvisableSchema.execute(query)
      expect(user.reload.application_status).to eq(:rejected)
      expect(user.reload.rejection_reason).to eq('not_hiring')
    end
  end
end
