# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateClientApplication do
  let(:user) { create(:user, application_status: "Application Started") }
  let(:context) { {current_user: user} }

  let(:query) do
    <<-GRAPHQL
    mutation update($input: UpdateClientApplicationInput!) {
      updateClientApplication(input: $input) {
        clientApplication {
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

  context 'when passing business type' do
    it "updates the business type" do
      user.company.update(business_type: nil)
      expect do
        request({businessType: "B2B"})
      end.to change {
        user.company.reload.business_type
      }.from(nil).to("B2B")
    end
  end

  context 'when passing title' do
    it "updates the title" do
      user.update(title: nil)
      expect do
        request({title: "CEO"})
      end.to change(user, :title).from(nil).to("CEO")
    end
  end

  context 'when passing company type' do
    it "updates the company kind" do
      user.company.update(kind: nil)
      expect do
        request({companyType: "Startup"})
      end.to change {
        user.company.reload.kind
      }.from(nil).to("Startup")
    end
  end

  context 'when passing goals' do
    it "updates the company goals" do
      user.company.update(goals: [])
      request({goals: %w[One Two]})
      expect(user.company.reload.goals).to include("One")
      expect(user.company.reload.goals).to include("Two")
    end
  end

  context 'when passing budget' do
    it "updates the users budget" do
      user.company.update(budget: nil)
      expect do
        request({budget: 5000})
      end.to change {
        user.company.reload.budget
      }.from(nil).to(5000)
    end
  end

  context 'when passing feedback' do
    it "sets the company feedback attribute" do
      user.company.update(feedback: nil)
      expect do
        request({feedback: true})
      end.to change {
        user.company.reload.feedback
      }.from(nil).to(true)
    end
  end

  context 'when passing marketingAttitude' do
    it "sets the company marketing attitude attribute" do
      user.company.update(marketing_attitude: nil)
      expect do
        request({marketingAttitude: "We’re pretty happy with our strategy & tactics"})
      end.to change {
        user.company.reload.marketing_attitude
      }.from(nil).to("We’re pretty happy with our strategy & tactics")
    end
  end
end
