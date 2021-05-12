# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::ResetClientApplication do
  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  let(:industry) { create(:industry, name: "Digital Marketing") }
  let(:skill) { create(:skill, name: 'Marketing') }
  let(:company) do
    create(
      :company,
      name: "SomeCorp",
      kind: "Growth-Stage Startup",
      budget: 100,
      industry: industry
    )
  end

  let(:user) do
    create(
      :user,
      application_status: "Application Rejected",
      company: company,
      number_of_freelancers: 0,
      skills: [skill],
      accepted_guarantee_terms_at: 1.day.ago,
      locality_importance: 1,
      rejection_reason: "not_hiring",
      talent_quality: "cheap"
    )
  end

  let(:query) do
    <<~GRAPHQL
      mutation {
        resetClientApplication(input: {
          id: "#{user.uid}",
        }) {
          clientApplication {
            id
          }
        }
      }
    GRAPHQL
  end

  it 'reset application status to Application Started' do
    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.application_status
    }.from('Application Rejected').to('Application Started')
    expect(user.company.budget).to eq(nil)
    expect(user.number_of_freelancers).to eq(nil)
    expect(user.skills).to eq([])
    expect(user.accepted_guarantee_terms_at).to eq(nil)
    expect(user.locality_importance).to eq(nil)
    expect(user.rejection_reason).to eq(nil)
    expect(user.talent_quality).to eq(nil)
  end
end
