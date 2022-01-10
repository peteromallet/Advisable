# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SetTaskRepeat do
  let(:task) { create(:task, repeat: nil) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setTaskRepeat(input: {
        id: "#{task.uid}",
        repeat: "Monthly"
      }) {
        task {
          id
          repeat
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: task.application.project.user} }

  it "sets repeat to 'Monthly'" do
    response = AdvisableSchema.execute(query, context:)
    repeat = response["data"]["setTaskRepeat"]["task"]["repeat"]
    expect(repeat).to eq("Monthly")
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHORIZED")
    end
  end
end
