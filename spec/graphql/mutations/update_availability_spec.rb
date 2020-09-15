require 'rails_helper'

RSpec.describe Mutations::UpdateAvailability do
  let(:user) { create(:user, availability: []) }
  let(:time) { 2.days.from_now.utc.iso8601 }

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateAvailability(input: {
        id: "#{user.airtable_id}",
        availability: ["#{time}"]
      }) {
        user {
          id
          availability
        }
      }
    }
    GRAPHQL
  end

  it 'updates the users availability' do
    expect(user.reload.availability).to be_empty
    response = AdvisableSchema.execute(query)
    availability =
      response['data']['updateAvailability']['user']['availability']
    expect(availability).to include(time)
  end
end
