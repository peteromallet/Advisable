require 'rails_helper'

describe Mutations::RequestReferences do
  let(:application) { create(:application, references_requested: false) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestReferences(input: {
        id: "#{application.airtable_id}",
      }) {
        application {
          status
        }
      }
    }
    GRAPHQL
  end

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it 'sets References Requested to true' do
    expect { AdvisableSchema.execute(query) }.to change {
      application.reload.references_requested
    }.from(false)
      .to(true)
  end
end
