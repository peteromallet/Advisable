require "rails_helper"

RSpec.describe MagicLinkHelper do
  describe "#magic_link" do
    it "returns the given path with mlt and mluid params" do
      account = create(:account)
      allow_any_instance_of(MagicLink).to receive(:token).and_return("token1234")
      url = helper.magic_link(account, "/testing")
      uri = URI.parse(url)
      query_params = CGI.parse(uri.query)
      expect(query_params["mlt"][0]).to eq("token1234")
      expect(query_params["mluid"][0]).to eq(account.uid)
    end

    it "doesn't remove any other query params" do
      account = create(:account)
      url = helper.magic_link(account, "/testing?existing=param")
      uri = URI.parse(url)
      query_params = CGI.parse(uri.query)
      expect(query_params["existing"][0]).to_not be_nil
    end

    it "creates a new magic link" do
      account = create(:account)
      expect {
        helper.magic_link(account, "/testing")
      }.to change { 
        account.magic_links.count
      }.by(1)
    end

    it "can set a custom expiration time" do
      account = create(:account)
      helper.magic_link(account, "/testing", expires_at: 5.days.from_now)
      magic_link = MagicLink.last
      expect(magic_link.expires_at).to be_within(1.second).of(5.days.from_now)
    end

    it "can set a custom amount of uses" do
      account = create(:account)
      helper.magic_link(account, "/testing", uses: 3)
      magic_link = MagicLink.last
      expect(magic_link.uses_remaining).to eq(3)
    end
  end
end
