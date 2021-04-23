# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateClientApplication do
  let(:user) { create(:user, application_status: "Application Started") }
  let(:context) { {current_user: user} }

  let(:query) do
    <<-GRAPHQL
    mutation update($input: UpdateClientApplicationInput!) {
      updateClientApplication(input: $input) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  def request(input)
    AdvisableSchema.execute(query, context: context, variables: {input: input})
  end

  it 'updates the users company name' do
    expect(user.company.reload.name).not_to eq("CHANGED")
    request({companyName: "CHANGED"})
    expect(user.company.reload.name).to eq("CHANGED")
  end

  context "when company name is not passed" do
    it "doesnt update the company name" do
      expect { request({}) }.not_to(change { user.company.reload.name })
    end
  end

  context 'when passing industries' do
    let!(:industry) { create(:industry, name: "Marketing") }

    it "updates the users industries" do
      user.company.update(industry: nil)
      expect do
        request({industry: industry.name})
      end.to change {
        user.company.industry
      }.from(nil).to(industry)
    end
  end
end
