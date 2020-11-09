RSpec.shared_examples "guild specialist" do
  describe "with a non guild specialist" do
    let(:non_guild_specialist) { create(:specialist) }
    let(:response) {
      resp = AdvisableSchema.execute(query, context: {current_user: non_guild_specialist})
    }

    it "returns a null response" do
      expect(response.dig('data', *response_keys)).to be_nil
    end
  end

  describe "with an authorized guild specialist" do
    let(:guild_specialist) { create(:specialist, :guild) }
    let(:response) {
      resp = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
    }

    it "does not return a null response" do
      expect(response.dig('data', *response_keys)).to be
    end
  end
end
