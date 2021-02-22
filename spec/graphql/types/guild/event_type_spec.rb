# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Guild::EventType do
  let(:current_user) { create(:specialist, :guild) }

  context "with a single event" do
    subject(:event_query) do
      resp = AdvisableSchema.execute(query, context: {current_user: current_user})
      resp["data"]["guildEvent"]
    end

    let(:guild_event) { create(:guild_event) }
    let(:query) do
      <<-GRAPHQL
        {
          guildEvent(id: "#{guild_event.id}") {
            id
            title
            description
            startsAt
            endsAt
            attending
          }
        }
      GRAPHQL
    end

    it "returns an event" do
      expect(event_query).to include(guild_event.slice("id", "title", "description"))
    end

    it "includes the start and end time" do
      expect(event_query).to include({
        "startsAt" => guild_event.starts_at.iso8601,
        "endsAt" => guild_event.ends_at.iso8601
      })
    end

    it "includes whether the viewer is attending" do
      guild_event.event_attendees.create!(attendee: current_user)
      guild_event.reload
      expect(event_query['attending']).to eq(true)
    end
  end

  context "with guild events" do
    subject(:events_query) do
      resp = AdvisableSchema.execute(query, context: {current_user: current_user})
      resp["data"]["guildEvents"]["nodes"]
    end

    before do
      create_list(:guild_event, 3)
    end

    let(:query) do
      <<-GRAPHQL
        {
          guildEvents(first: 10) {
            nodes {
              id
            }
          }
        }
      GRAPHQL
    end

    it "includes a list of upcoming guild events" do
      expect(events_query.flat_map(&:values)).to eq(Guild::Event.upcoming.pluck(:id))
    end

    it "does not include events older than now" do
      old_event = create(:guild_event, starts_at: 5.minutes.ago, ends_at: 1.minute.ago)
      expect(events_query).not_to include({"id" => old_event.id})
    end
  end
end
