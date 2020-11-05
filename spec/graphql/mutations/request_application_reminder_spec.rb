require 'rails_helper'

RSpec.describe Mutations::RejectApplication do
  let(:user) { create(:user, application_status: "Application Rejected") }

  let(:query) do
    <<-GRAPHQL
      mutation {
        requestApplicationReminder(input: {
          id: "#{user.uid}",
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user: user} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  before :each do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'sets the application status to remind' do
    expect { response }.to change { user.reload.application_status }.from(
      "Application Rejected"
    ).to(:remind)
    expect(user.reload.application_reminder_at).to be_within(5.seconds).of(
      6.months.from_now
    )
  end

  context 'when the application status is not rejected' do
    let(:user) { create(:user, application_status: :remind) }

    it 'returns an error' do
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq('notRejected')
    end
  end
end
