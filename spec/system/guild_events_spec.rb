# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild events view', type: :system do
  let(:account)    { create(:account, completed_tutorials: ["GUILD"]) }
  let(:specialist) { create(:specialist, :guild, account: account) }
  let(:host)       { create(:specialist, :guild) }
  let!(:event)     { create(:guild_event, host: host) }

  before do
    authenticate_as(specialist)
  end

  context "when viewing the events list" do
    it "displays a message if there are no events" do
      allow(Guild::Event).to receive(:upcoming).and_return([])

      visit "/guild/events"
      expect(page).to have_content("There are no upcoming Events")
    end

    it "shows if the viewer is attending" do
      visit "/guild/events"
      expect(page).not_to have_content("Attending")

      event.attendees << specialist
      visit "/guild/events"
      expect(page).to have_content("Attending")
      expect(page).to have_content("#{event.reload.attendees_count} Attending")
    end
  end
end
