require 'rails_helper'

describe Mutations::UpdateApplication do
  let(:specialist) { create(:specialist) }
  let(:project) { create(:project, questions: ['This is a question?']) }
  let(:application) do
    create(
      :application,
      {
        specialist: specialist,
        introduction: false,
        project: project,
        questions: []
      }
    )
  end

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  context 'when updating the introduction' do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          introduction: "This is the intro"
        }) {
          application {
            introduction
          }
        }
      }
      GRAPHQL
    end

    it 'updates the introduction' do
      response = AdvisableSchema.execute(query)
      intro =
        response['data']['updateApplication']['application']['introduction']
      expect(intro).to eq('This is the intro')
    end
  end

  context 'when updating the availability' do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          availability: "2 Weeks"
        }) {
          application {
            availability
          }
        }
      }
      GRAPHQL
    end

    it 'updates the availability' do
      response = AdvisableSchema.execute(query)
      availability =
        response['data']['updateApplication']['application']['availability']
      expect(availability).to eq('2 Weeks')
    end
  end

  context 'when updating questions' do
    let(:question) { 'This is a question?' }
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          questions: [{question: "#{question}",
            answer: "This is an answer"
          }]
        }) {
          errors {
            code
          }
        }
      }
      GRAPHQL
    end

    it 'updates the questions' do
      expect { AdvisableSchema.execute(query) }.to change {
        application.reload.questions
      }.from([])
        .to(
        [
          {
            'question' => 'This is a question?', 'answer' => 'This is an answer'
          }
        ]
      )
    end

    context 'and an invalid question is passed' do
      let(:question) { 'Not a question?' }

      it 'returns an error' do
        response = AdvisableSchema.execute(query)
        error = response['data']['updateApplication']['errors'][0]
        expect(error['code']).to eq('invalid_question')
      end
    end
  end

  context 'when updating the references' do
    let(:off_platform_project) do
      create(:off_platform_project, specialist: specialist)
    end
    let(:previous_project) { create(:project) }

    before :each do
      create(:application, specialist: specialist, project: previous_project)
    end

    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          references: ["#{off_platform_project.airtable_id}", "#{
        project.airtable_id
      }"]
        }) {
          errors {
            code
          }
        }
      }
      GRAPHQL
    end

    it 'adds the references' do
      expect { AdvisableSchema.execute(query) }.to change {
        application.reload.references.count
      }.by(2)
    end
  end

  context 'when updating the rate' do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          rate: 100
        }) {
          application {
            rate
          }
          errors {
            code
          }
        }
      }
      GRAPHQL
    end

    it 'updates the rate' do
      response = AdvisableSchema.execute(query)
      rate = response['data']['updateApplication']['application']['rate']
      expect(rate).to eq('100.0')
    end
  end

  context 'when updating accepts_fee' do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          acceptsFee: true
        }) {
          application {
            acceptsFee
          }
          errors {
            code
          }
        }
      }
      GRAPHQL
    end

    it 'updates accepts_fee attribute' do
      response = AdvisableSchema.execute(query)
      acceptsFee =
        response['data']['updateApplication']['application']['acceptsFee']
      expect(acceptsFee).to be_truthy
    end
  end

  context 'when updating accepts_terms' do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.airtable_id}",
          acceptsTerms: true
        }) {
          application {
            acceptsTerms
          }
          errors {
            code
          }
        }
      }
      GRAPHQL
    end

    it 'updates accepts_fee attribute' do
      response = AdvisableSchema.execute(query)
      acceptsTerms =
        response['data']['updateApplication']['application']['acceptsTerms']
      expect(acceptsTerms).to be_truthy
    end
  end
end
