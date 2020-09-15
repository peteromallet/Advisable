require "rails_helper"

RSpec.describe Mutations::DeleteAnswer do
  let(:specialist) { create(:specialist) }
  let(:question) { create(:question) }
  let!(:answer) { create(:answer, question: question, specialist: specialist, content: "Black bear.") }
  let(:context) { {current_user: specialist} }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteAnswer(input: {
        id: "#{answer.uid}"
      }) {
        id
      }
    }
    GRAPHQL
  end

  it "deletes the answer" do
    response = AdvisableSchema.execute(query, context: context)
    expect(Answer.find_by(uid: response["data"]["deleteAnswer"]["id"])).to be_nil
  end

  context "answer by another user" do
    let(:dwight) { create(:specialist) }
    let!(:dwight_answer) { create(:answer, question: question, specialist: dwight, content: "It depends.") }
    let(:query) do
      <<-GRAPHQL
      mutation {
        deleteAnswer(input: {
          id: "#{dwight_answer.uid}"
        }) {
          id
        }
      }
      GRAPHQL
    end

    it "can not delete the answer" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"].first["message"]).to eq("Resouce was not found")
    end
  end
end
