# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::RegisterGuildEvent do
  subject(:register_guild_event) do
    resp = AdvisableSchema.execute(query, context: {current_user: current_user})
    resp["data"]["registerGuildEvent"]
  end

  let(:current_user) { create(:specialist, :guild) }
  let(:guild_event) { create(:guild_event) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      registerGuildEvent(input: {
        guildEventId: "#{guild_event.uid}"
      }) {
        guildEvent {
          id
          attending
        }
      }
    }
    GRAPHQL
  end

  it "registers the current_user for the guild event" do
    expect do
      register_guild_event
      guild_event.reload
    end.to change(Guild::EventAttendee, :count).from(0).to(1).
      and change(guild_event, :attendees_count).from(0).to(1)
  end

  it "does not register the current_user of they are already registered" do
    guild_event.event_attendees.create!(attendee: current_user)

    expect do
      register_guild_event
      guild_event.reload
    end.not_to change(guild_event, :attendees_count)
  end

  it "returns an event and whether current user is attending" do
    resp = register_guild_event
    expect(resp["guildEvent"]).to include({
      "attending" => true,
      "id" => guild_event.uid
    })
  end
end
