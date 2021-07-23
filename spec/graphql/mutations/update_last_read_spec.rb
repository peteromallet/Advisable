# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateLastRead do
  let(:current_user) { create(:user) }
  let(:current_account) { current_user&.account }
  let(:conversation) { create(:conversation) }
  let!(:participant) do
    create(:conversation_participant, account: current_user.account, conversation: conversation) if current_user
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateLastRead(input: {
        conversation: "#{conversation.uid}"
      }) {
        conversation {
          lastReadAt
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: current_user, current_account: current_account} }

  it "updates last read" do
    expect(participant.last_read_at).to be_nil
    response = AdvisableSchema.execute(query, context: context)
    last_read = Time.zone.parse(response["data"]["updateLastRead"]["conversation"]["lastReadAt"])
    expect(last_read).to be_within(3.seconds).of(Time.zone.now)
    expect(participant.reload.last_read_at.change(usec: 0)).to eq(last_read)
  end

  context "when the current user is not logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the logged in user is not a participant" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the logged in account is an aadmin" do
    let(:current_account) { create(:account, :admin) }

    it "does not update last read" do
      expect(participant.last_read_at).to be_nil
      AdvisableSchema.execute(query, context: context)
      expect(participant.reload.last_read_at).to be_nil
    end
  end
end
