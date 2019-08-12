require 'rails_helper'

describe Mutations::SetMonthlyLimit do
  let(:application) { create(:application, monthly_limit: nil) }
  let(:context) { { current_user: application.project.user } }

  let(:query) { %|
    mutation {
      setMonthlyLimit(input: {
        application: #{application.airtable_id},
        monthlyLimit: 400
      }) {
        application {
          id
        }
        errors {
          code
        }
      }
    }
  |}

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the monthly_limit" do
    expect {
      AdvisableSchema.execute(query, context: context)
    }.to change {
      application.reload.monthly_limit
    }.from(nil).to(400)
  end

  context 'When the user is not the owner of the project' do
    let(:context)  {{ current_user: create(:user) }}

    it 'returns an error' do
      response = AdvisableSchema.execute(query, context: context)
      error = response["data"]["setMonthlyLimit"]["errors"][0]["code"]
      expect(error).to eq("not_authorized")
    end
  end
end