# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Events view', type: :system do
  let(:account)    { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, :guild, account: account) }
  let(:host)       { create(:specialist, :guild) }

  before do
    authenticate_as(specialist)
  end

  context "when viewing the events list" do
    it "displays a message if there are no events" do
      visit "/guild/events"
      expect(page).to have_content("There are no upcoming Events")
    end

    it "shows if the viewer is attending" do
      event = create(:event, host: host)
      visit "/guild/events"
      expect(page).not_to have_content("Attending")

      event.attendees << specialist
      visit "/guild/events"
      expect(page).to have_content("Attending")
      expect(page).to have_content("#{event.attendees.count} Attending")
    end

    it "includes older events that have ended" do
      create(:event, starts_at: 2.days.ago, ends_at: 1.day.ago, host: host)
      visit "/guild/events"

      expect(page).to have_content("Ended")
    end
  end

  context "with the navbar" do
    it "shows the number of upcoming events" do
      create_list(:event, 3, host: host)
      create(:event, starts_at: 1.day.ago, ends_at: 1.hour.ago)

      visit "/guild/feed"
      expect(page).to have_xpath("//div[@data-testid='upcomingEvents']", text: 3)
    end
  end
end
