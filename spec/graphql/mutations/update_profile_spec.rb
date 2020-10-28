require 'rails_helper'

RSpec.describe Mutations::UpdateProfile do
  let(:skill) { create(:skill) }
  let!(:country) { create(:country, alpha2: 'IE', name: 'Ireland') }
  let(:specialist) do
    create(:specialist, {bio: nil, city: nil, country: nil, remote: false})
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateProfile(input: {
        email: "staging+dwight2@advisable.com",
        bio: "This is the bio",
        skills: ["#{skill.name}"],
        city: "Dublin",
        country: "IE",
        remote: true
      }) {
        specialist {
          email
          bio
          city
          remote
          skills {
            name
          }
          country {
            name
          }
        }
      }
    }
    GRAPHQL
  end

  let(:response) do
    AdvisableSchema.execute(query, context: {current_user: specialist})
  end

  before :each do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'updates the email' do
    email = response['data']['updateProfile']['specialist']['email']
    expect(email).to eq('staging+dwight2@advisable.com')
  end

  it 'updates the bio' do
    bio = response['data']['updateProfile']['specialist']['bio']
    expect(bio).to eq('This is the bio')
  end

  it 'updates the city' do
    city = response['data']['updateProfile']['specialist']['city']
    expect(city).to eq('Dublin')
  end

  it 'updates the country' do
    country = response['data']['updateProfile']['specialist']['country']
    expect(country).to_not be_nil
  end

  it 'updates the remote attribute' do
    remote = response['data']['updateProfile']['specialist']['remote']
    expect(remote).to be_truthy
  end

  it 'updates the skills' do
    skills = response['data']['updateProfile']['specialist']['skills']
    expect(skills).to eq([{'name' => skill.name}])
  end

  context 'when a Service::Error is thrown' do
    before :each do
      error = Service::Error.new('service_error')
      allow(Specialists::UpdateProfile).to receive(:call).and_raise(error)
    end

    it 'returns an error' do
      error = response['errors'][0]['extensions']
      expect(error['code']).to eq('failedToUpdate')
    end
  end

  context 'when there is no viewer' do
    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: {current_user: nil})
      error_code = response['errors'][0]['extensions']['code']
      expect(error_code).to eq('notAuthenticated')
    end
  end

  context 'when there is a User logged in' do
    it 'returns an error' do
      response =
        AdvisableSchema.execute(query, context: {current_user: create(:user)})
      error_code = response['errors'][0]['extensions']['code']
      expect(error_code).to eq('notAuthenticated')
    end
  end
end
