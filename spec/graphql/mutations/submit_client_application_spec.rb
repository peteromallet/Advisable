require 'rails_helper'

RSpec.describe Mutations::SubmitClientApplication do
  let(:user) { create(:user, application_status: "Application Started") }
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

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'sets the status to accepted' do
    expect { AdvisableSchema.execute(query) }.to change {
      user.reload.application_status
    }.from("Application Started").to("Application Accepted")
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

    it 'sets the status to rejected with a reason' do
      AdvisableSchema.execute(query)
      expect(user.reload.application_status).to eq("Application Rejected")
      expect(user.reload.rejection_reason).to eq('cheap_talent')
    end
  end

  context 'when they select not hiring any freelancers' do
    let(:user) do
      create(:user, application_status: "Application Started", number_of_freelancers: '0')
    end

    it 'sets the status to rejected with a reason' do
      AdvisableSchema.execute(query)
      expect(user.reload.application_status).to eq("Application Rejected")
      expect(user.reload.rejection_reason).to eq('not_hiring')
    end
  end

  context "with case study search" do
    let(:goals) { %w[one two] }

    it "creates one with goals and company name" do
      create(:project, goals: goals, user: user)
      AdvisableSchema.execute(query)
      search = ::CaseStudy::Search.find_by(user: user)
      expect(search.goals).to match_array(goals)
      expect(search.business_type).to eq("Startup")
      expect(search.name).to eq("Project recommendations for Test Company")
    end
  end
end
