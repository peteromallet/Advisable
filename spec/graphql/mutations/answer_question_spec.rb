require "rails_helper"

RSpec.describe Mutations::AnswerQuestion do
  let(:specialist) { create(:specialist) }
  let(:question) { create(:question) }
  let(:context) { {current_user: specialist} }

  let(:query) do
    <<-GRAPHQL
    mutation {
      answerQuestion(input: {
        question: "#{question.uid}",
        content: "It depends."
      }) {
        answer {
          id
          content
          question {
            id
            content
          }
        }
      }
    }
    GRAPHQL
  end

  context "no answer exists" do
    it "creates a new answer" do
      expect(Answer.find_by(question: question)).to be_nil
      response = AdvisableSchema.execute(query, context: context)
      expect(Answer.find_by(question: question).content).to eq("It depends.")
    end
  end

  context "answer exists already" do
    let!(:answer) { create(:answer, question: question, specialist: specialist, content: "Black bear.") }
    it "overwrites answer" do
      expect(Answer.find_by(question: question).content).to eq("Black bear.")
      response = AdvisableSchema.execute(query, context: context)
      expect(Answer.find_by(question: question).content).to eq("It depends.")
    end
  end

  describe 'errors' do
    context "specialist not logged in" do
      let(:context) { {current_user: nil} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("NOT_AUTHENTICATED")
      end
    end

    context "logged in user does not have answers" do
      let(:context) { {current_user: create(:user)} }

      it "raises an error" do
        response = AdvisableSchema.execute(query, context: context)
        error = response["errors"].first["extensions"]["type"]
        expect(error).to eq("INVALID_REQUEST")
      end
    end
  end
end
