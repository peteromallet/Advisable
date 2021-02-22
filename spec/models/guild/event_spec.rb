# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Event, type: :model do
  let(:host) { create(:specialist, :guild) }
  let(:guild_event) { build(:guild_event, host: host) }

  describe "db columns" do
    it { expect(guild_event).to have_db_column :id }
    it { expect(guild_event).to have_db_column :title }
    it { expect(guild_event).to have_db_column :description }
    it { expect(guild_event).to have_db_column :starts_at }
    it { expect(guild_event).to have_db_column :ends_at }
    it { expect(guild_event).to have_db_column :attendees_count }
  end

  describe "relationships" do
    it { expect(guild_event).to have_many(:event_attendees) }
    it { expect(guild_event).to have_many(:attendees) }
    it { expect(guild_event).to belong_to(:host).class_name('Specialist') }
  end

  it "is valid" do
    expect(guild_event).to be_valid
  end

  it "raises an error if the ends_at is not after the starts_at" do
    expect do
      guild_event.update!(ends_at: Time.zone.at(0))
    end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Ends at must be after starts_at/)
  end

  it "has a counter for event attendees" do
    guild_event.save!

    expect do
      guild_event.event_attendees.create(attendee: create(:specialist))
      guild_event.reload
    end.to change(guild_event, :attendees_count).from(0).to(1)
  end

  describe "with upcoming" do
    let(:old_event) { create(:guild_event, starts_at: 1.year.ago, ends_at: 1.month.ago) }
    let(:upcoming) { create_list(:guild_event, 2, starts_at: 1.hour.from_now, ends_at: 2.hours.from_now) }

    it "does not include events older than now" do
      expect(described_class.upcoming).to eq(upcoming)
      expect(described_class.upcoming).not_to include(old_event)
    end
  end
end
