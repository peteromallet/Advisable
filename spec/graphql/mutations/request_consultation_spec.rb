# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::RequestConsultation do
  let(:specialist) { create(:specialist) }
  let(:current_user) { create(:user) }
  let(:context) { {current_user: current_user} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      requestConsultation(input: {
        specialist: "#{specialist.uid}",
        message: "Wanna work for me, bro?",
      }) {
        consultation {
          id
        }
      }
    }
    GRAPHQL
  end

  it "creates a new consultation" do
    expect { AdvisableSchema.execute(query, context: context) }.to change(Consultation, :count).by(1)
  end

  context "when there's a case study article" do
    let(:article) { create(:case_study_article, specialist: specialist) }

    it "uses primary skill of an article if there is one" do
      ::CaseStudy::Skill.create!(article: article, primary: false, skill: create(:skill, name: "Third"))
      ::CaseStudy::Skill.create!(article: article, primary: true, skill: create(:skill, name: "Primary"))

      response = AdvisableSchema.execute(query, context: context)
      uid = response["data"]["requestConsultation"]["consultation"]["id"]
      consultation = Consultation.find_by!(uid: uid)
      expect(consultation.skill.name).to eq("Primary")
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response['errors'][0]['extensions']['code']
      expect(error).to eq("MUST_BE_USER")
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)

      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end
end
