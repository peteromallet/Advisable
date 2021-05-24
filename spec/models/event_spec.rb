# frozen_string_literal: true

require "rails_helper"

RSpec.describe Event, type: :model do
  let(:host) { create(:specialist, :guild) }
  let(:event) { build(:event, host: host) }

  describe "db columns" do
    it { expect(event).to have_db_column :id }
    it { expect(event).to have_db_column :title }
    it { expect(event).to have_db_column :description }
    it { expect(event).to have_db_column :starts_at }
    it { expect(event).to have_db_column :ends_at }
    it { expect(event).to have_db_column :published_at }
    it { expect(event).to have_db_column :url }
    it { expect(event).to have_db_column :featured }
  end

  describe "relationships" do
    it { expect(event).to have_many(:event_attendees) }
    it { expect(event).to have_many(:attendees) }
    it { expect(event).to belong_to(:host).class_name('Specialist') }
  end

  it "is valid" do
    expect(event).to be_valid
  end

  it "raises an error if the ends_at is not after the starts_at" do
    expect do
      event.update!(ends_at: Time.zone.at(0))
    end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Ends at must be after starts_at/)
  end

  describe "with list" do
    let(:ended) { create(:event, starts_at: 1.year.ago, ends_at: 1.month.ago) }
    let(:upcoming) { create(:event, starts_at: 1.hour.from_now, ends_at: 2.hours.from_now) }

    it "includes upcoming and concluded events" do
      expect(described_class.list).to include(upcoming)
      expect(described_class.list).to include(ended)
    end

    it "does not include events that are not published" do
      upcoming.update!(published_at: nil)
      expect(described_class.list).not_to include(upcoming)
    end

    it "includes an event that is in progress" do
      in_progress = create(:event, starts_at: 1.minute.ago, ends_at: 5.minutes.from_now)
      expect(described_class.list).to include(in_progress)
    end

    it "includes the featured event at the beginning if there is one" do
      featured = create(:event, starts_at: 12.hours.from_now, ends_at: 13.hours.from_now, featured: true)
      expect(described_class.list.first).to eq(featured)
    end
  end

  describe "with a featured event" do
    let(:featured_event) { create(:event, featured: true) }

    it "will change the previously featured event" do
      expect do
        event.update!(featured: true)
        featured_event.reload
      end.to change(featured_event, :featured).from(true).to(false)
    end
  end
end
