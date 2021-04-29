# frozen_string_literal: true

require "rails_helper"

RSpec.describe GraphqlController, type: :request do
  let(:api_key) { ENV["API_ACCESS_KEY"] }
  let(:headers) { {"Api-Key" => api_key} }
  let(:params) { {query: query} }
  let(:query) do
    <<-GRAPHQL
      {
        caseStudies {
          id
        }
      }
    GRAPHQL
  end

  describe "POST /graphql", allow_forgery_protection: true do
    it "works" do
      post("/graphql", params: params, headers: headers)
      expect(response).to have_http_status(:success)
      expect(JSON[response.body]["data"].keys).to eq(["caseStudies"])
    end

    context "when wrong api key" do
      let(:api_key) { "1234" }

      it "is unauthorized" do
        expect { post("/graphql", params: params, headers: headers) }.to raise_error(ActionController::InvalidAuthenticityToken)
      end
    end

    context "when no api key" do
      let(:api_key) { "" }

      it "is unauthorized" do
        expect { post("/graphql", params: params, headers: headers) }.to raise_error(ActionController::InvalidAuthenticityToken)
      end
    end

    context "when no headers" do
      let(:headers) { {} }

      it "is unauthorized" do
        expect { post("/graphql", params: params, headers: headers) }.to raise_error(ActionController::InvalidAuthenticityToken)
      end
    end
  end
end
