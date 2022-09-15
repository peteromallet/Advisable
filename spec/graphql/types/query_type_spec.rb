# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::QueryType do
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }
  let(:response) { AdvisableSchema.execute(query, context:) }

  describe "followed labels" do
    subject(:followed_labels) { response.dig("data", "followedLabels") }

    let(:labels) { create_list(:label, 3) }
    let(:query) do
      <<-GRAPHQL
      {
        followedLabels {
          id
          name
        }
      }
      GRAPHQL
    end

    before { labels.each { |label| specialist.subscribe_to!(label) } }

    it "returns the labels that the specialist follows" do
      expect(followed_labels).to eq(labels.reverse.as_json(only: %i[id name]))
    end
  end
end
