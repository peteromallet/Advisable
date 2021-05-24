# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::EventType do
  let(:current_user) { create(:specialist, :guild) }

  context "with a single event" do
    subject(:event_query) do
      resp = AdvisableSchema.execute(query, context: {current_user: current_user})
      resp["data"]["event"]
    end

    let(:event) { create(:event) }
    let(:query) do
      <<-GRAPHQL
        {
          event(id: "#{event.uid}") {
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
      expect(event_query["id"]).to eq(event.uid)
    end

    it "includes the start and end time" do
      expect(event_query).to include({
        "startsAt" => event.starts_at.iso8601,
        "endsAt" => event.ends_at.iso8601
      })
    end

    it "includes whether the viewer is attending" do
      event.event_attendees.create!(attendee: current_user)
      event.reload
      expect(event_query['attending']).to eq(true)
    end
  end

  context "with events" do
    subject(:events_query) do
      resp = AdvisableSchema.execute(query, context: {current_user: current_user})
      resp["data"]["events"]["nodes"]
    end

    before do
      create_list(:event, 3)
    end

    let(:query) do
      <<-GRAPHQL
        {
          events(first: 10) {
            nodes {
              id
            }
          }
        }
      GRAPHQL
    end

    it "includes a list of events" do
      expect(events_query.flat_map(&:values)).to eq(Event.list.pluck(:uid))
    end

    it "includes events that have ended" do
      old_event = create(:event, starts_at: 5.minutes.ago, ends_at: 1.minute.ago)
      expect(events_query).to include({"id" => old_event.uid})
    end
  end
end
