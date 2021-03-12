# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::UnregisterGuildEvent do
  subject(:unregister_guild_event) do
    resp = AdvisableSchema.execute(query, context: {current_user: current_user})
    resp["data"]["unregisterGuildEvent"]["guildEvent"]
  end

  let(:current_user) { create(:specialist, :guild) }
  let(:guild_event) { create(:guild_event) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      unregisterGuildEvent(input: {
        guildEventId: "#{guild_event.uid}"
      }) {
        guildEvent {
          attending
        }
      }
    }
    GRAPHQL
  end

  before do
    guild_event.event_attendees.create!(attendee: current_user)
  end

  it "deletes an event attendee record for current_user" do
    expect do
      unregister_guild_event
      guild_event.reload
    end.to change(guild_event, :attendees_count).from(1).to(0)
  end

  it "returns success when deleted" do
    expect(unregister_guild_event).to eq({"attending" => false})
  end
end
