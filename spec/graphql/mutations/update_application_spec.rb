# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateApplication do
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }
  let(:project) { create(:project, questions: ["This is a question?"]) }
  let(:application) { create(:application, {specialist: specialist, introduction: false, project: project, questions: []}) }
  let(:extra) { "" }
  let(:response_fields) { "" }
  let(:query) do
    <<-GRAPHQL
    mutation {
      updateApplication(input: {
        id: "#{application.uid}",
        #{extra}
      }) {
        application {
          id
          #{response_fields}
        }
      }
    }
    GRAPHQL
  end

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  context "when updating the introduction" do
    let(:extra) { "introduction: \"This is the intro\"" }
    let(:response_fields) { "introduction" }

    it "updates the introduction" do
      response = AdvisableSchema.execute(query, context: context)
      intro = response["data"]["updateApplication"]["application"]["introduction"]
      expect(intro).to eq("This is the intro")
    end
  end

  context "when updating the availability" do
    let(:extra) { "availability: \"2 Weeks\"" }
    let(:response_fields) { "availability" }

    it "updates the availability" do
      response = AdvisableSchema.execute(query, context: context)
      availability =
        response["data"]["updateApplication"]["application"]["availability"]
      expect(availability).to eq("2 Weeks")
    end
  end

  context "when updating questions" do
    let(:question) { "This is a question?" }
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.uid}",
          questions: [{question: "#{question}",
            answer: "This is an answer"
          }]
        }) {
          application {
            id
          }
        }
      }
      GRAPHQL
    end

    it "updates the questions" do
      expect { AdvisableSchema.execute(query, context: context) }.to change {
        application.reload.questions
      }.from([]).to([{"question" => "This is a question?", "answer" => "This is an answer"}])
    end

    context "when an invalid question is passed" do
      let(:question) { "Not a question?" }

      it "returns an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"][0]
        expect(error["extensions"]["code"]).to eq("invalid_question")
      end
    end
  end

  context "when updating the references" do
    let(:previous_project) { create(:previous_project, specialist: specialist) }
    let(:previous_project2) { create(:previous_project, specialist: specialist) }

    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.uid}",
          references: [
            "#{previous_project.uid}",
            "#{previous_project2.uid}"]
        }) {
          application {
            id
          }
        }
      }
      GRAPHQL
    end

    before { create(:application, specialist: specialist) }

    it "adds the references" do
      expect { AdvisableSchema.execute(query, context: context) }.to change {
        application.reload.application_references.count
      }.by(2)
    end

    context "when an invalid ID is passed" do
      let(:previous_project2) { OpenStruct.new(uid: "invalid") }

      it "returns an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"][0]
        expect(error["extensions"]["code"]).to eq("invalid_reference")
      end
    end
  end

  context "when updating the rate" do
    context "with rate" do
      let(:query) do
        <<-GRAPHQL
        mutation {
          updateApplication(input: {
            id: "#{application.uid}",
            invoiceRate: 10000
          }) {
            application {
              invoiceRate
            }
          }
        }
        GRAPHQL
      end

      it "updates the rate" do
        response = AdvisableSchema.execute(query, context: context)
        invoice_rate = response["data"]["updateApplication"]["application"]["invoiceRate"]
        expect(invoice_rate).to eq(10000)
      end
    end

    context "with invoice_rate" do
      let(:query) do
        <<-GRAPHQL
        mutation {
          updateApplication(input: {
            id: "#{application.uid}",
            invoiceRate: 10000
          }) {
            application {
              invoiceRate
            }
          }
        }
        GRAPHQL
      end

      it "updates the rate" do
        response = AdvisableSchema.execute(query, context: context)
        rate = response["data"]["updateApplication"]["application"]["invoiceRate"]
        expect(rate).to eq(10000)
      end
    end
  end

  context "when updating accepts_fee" do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.uid}",
          acceptsFee: true
        }) {
          application {
            acceptsFee
          }
        }
      }
      GRAPHQL
    end

    it "updates accepts_fee attribute" do
      response = AdvisableSchema.execute(query, context: context)
      accepts = response["data"]["updateApplication"]["application"]["acceptsFee"]
      expect(accepts).to be_truthy
    end
  end

  context "when updating accepts_terms" do
    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.uid}",
          acceptsTerms: true
        }) {
          application {
            acceptsTerms
          }
        }
      }
      GRAPHQL
    end

    it "updates accepts_fee attribute" do
      response = AdvisableSchema.execute(query, context: context)
      accepts = response["data"]["updateApplication"]["application"]["acceptsTerms"]
      expect(accepts).to be_truthy
    end
  end

  context "when passing persistBio" do
    let(:specialist) { create(:specialist, bio: "Before") }
    let(:persist_bio) { true }

    let(:query) do
      <<-GRAPHQL
      mutation {
        updateApplication(input: {
          id: "#{application.uid}",
          introduction: "After",
          persistBio: #{persist_bio}
        }) {
          application {
            id
          }
        }
      }
      GRAPHQL
    end

    it "saves the bio to the specialist record" do
      expect do
        AdvisableSchema.execute(query, context: context)
      end.to change { specialist.reload.bio }.from("Before").to("After")
    end

    context "when persistBio is false" do
      let(:persist_bio) { false }

      it "does not save the bio to the specialist record" do
        expect do
          AdvisableSchema.execute(query)
        end.not_to(change { specialist.reload.bio })
      end
    end
  end

  context "when provided application is not from the signed in user" do
    let(:application) { create(:application) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("INVALID_APPLICATION")
    end
  end

  context "when application doesn't exist" do
    let(:application) { OpenStruct.new(uid: "not-a-uid") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("NOT_FOUND")
    end
  end
end
