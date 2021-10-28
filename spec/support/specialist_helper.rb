# frozen_string_literal: true

RSpec.shared_examples("accepted specialist") do
  describe "with a rejected specialist" do
    let(:rejected_specialist) { create(:specialist, :rejected) }
    let(:response) { AdvisableSchema.execute(query, context: {current_user: rejected_specialist}) }

    it "returns a null response" do
      expect(response.dig("data", *response_keys)).to be_nil
    end
  end

  describe "with an accepted specialist" do
    let(:specialist) { create(:specialist) }
    let(:response) { AdvisableSchema.execute(query, context: {current_user: specialist}) }

    it "does not return a null response" do
      expect(response.dig("data", *response_keys)).not_to be_nil
    end
  end
end
