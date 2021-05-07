# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateEventRegistration do
  let(:current_user) { create(:specialist, :guild) }
  let(:event) { create(:event) }

  context "when registering" do
    subject(:update_event_registration) do
      resp = AdvisableSchema.execute(register_query, context: {current_user: current_user})
      resp["data"]["updateEventRegistration"]
    end

    let(:action_type) { "REGISTER" }
    let(:register_query) do
      <<-GRAPHQL
    mutation {
      updateEventRegistration(input: {
        eventId: "#{event.uid}"
        actionType: #{action_type},
      }) {
        event {
          id
          attending
        }
      }
    }
      GRAPHQL
    end

    it "registers the current_user for the event" do
      expect do
        update_event_registration
        event.reload
      end.to change(EventAttendee, :count).from(0).to(1).
        and change(event.attendees, :count).from(0).to(1)
    end

    it "does not register the current_user of they are already registered" do
      event.event_attendees.create!(attendee: current_user)

      expect do
        update_event_registration
        event.reload
      end.to change(event, :event_attendees)
    end

    it "returns an event and whether current user is attending" do
      resp = update_event_registration
      expect(resp["event"]).to include({
        "attending" => true,
        "id" => event.uid
      })
    end
  end

  context "when unregistering" do
    subject(:update_event_registration) do
      resp = AdvisableSchema.execute(unregister_query, context: {current_user: current_user})
      resp["data"]["updateEventRegistration"]
    end

    let(:action_type) { "UNREGISTER" }
    let(:unregister_query) do
      <<-GRAPHQL
    mutation {
      updateEventRegistration(input: {
        eventId: "#{event.uid}"
        actionType: #{action_type},
      }) {
        event {
          attending
        }
      }
    }
      GRAPHQL
    end

    before do
      event.event_attendees.create!(attendee: current_user)
    end

    it "deletes an event attendee record for current_user" do
      expect do
        update_event_registration
        event.reload
      end.to change(event.event_attendees, :count).from(1).to(0)
    end

    it "shows the viewer as not attending" do
      expect(update_event_registration["event"]).to eq({"attending" => false})
    end
  end
end
