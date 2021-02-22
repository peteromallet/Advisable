# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::EventAttendee, type: :model do
  let(:attendee) { create(:specialist, :guild) }
  let(:guild_event) { create(:guild_event) }
  let!(:event_attendee) { guild_event.event_attendees.create!(attendee: attendee) }

  describe "db columns" do
    it { expect(event_attendee).to have_db_column :id }
    it { expect(event_attendee).to have_db_column :specialist_id }
    it { expect(event_attendee).to have_db_column :guild_event_id }
  end

  describe "relationships" do
    it { expect(event_attendee).to belong_to(:guild_event) }
    it { expect(event_attendee).to belong_to(:attendee).class_name('Specialist') }
  end

  it "is valid" do
    expect(event_attendee).to be_valid
  end

  it "raises an error if the attendee is already attending the event" do
    expect do
      guild_event.reload.event_attendees.create!(attendee: attendee)
    end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Attendee has already registered for this event/)
  end
end
