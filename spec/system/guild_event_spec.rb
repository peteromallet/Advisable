# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild event view', type: :system do
  let(:account)    { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, :guild, account: account) }
  let(:host)       { create(:specialist, :guild) }
  let!(:event)     { create(:guild_event, host: host) }

  before do
    authenticate_as(specialist)
  end

  context "when viewing an event" do
    it "displays the event details in the users timezone" do
      override_tz = "America/New_York"
      ENV['TZ'] = override_tz
      Capybara.using_session(override_tz) do
        Time.use_zone(override_tz) do
          visit "/guild/events/#{event.uid}"
          expect(page).to have_content(event.title)
          expect(page).to have_content(event.description)

          starts_at = event.starts_at.strftime("%d %b at %-l:%M%P")
          expect(page).to have_content(starts_at)
          expect(page).to have_text(event.host.name)

          time_start = event.starts_at.strftime("%-l:%M%P")
          time_end = event.ends_at.strftime("%-l:%M%P %Z")
          expect(page).to have_text(/#{time_start} - #{time_end}/)
        end
      end
    end

    it 'can be registered or unregistered for' do
      visit "/guild/events/#{event.uid}"
      expect(page).not_to have_content('Attendees')
      find(:xpath, ".//button[contains(text(), 'Register for event')]").click
      expect(page).to have_content('Attendees')
      expect(page).to have_content(specialist.first_name)

      find(:xpath, ".//button[contains(text(), 'Unregister')]").click
      expect(page).not_to have_content(specialist.first_name)
    end

    it "does not display a register button if the viewer is the host" do
      event.update!(host: specialist)

      visit "/guild/events/#{event.uid}"
      expect(page).not_to have_content('Register for event')
      expect(page).not_to have_content('Unregister')
    end

    it "shows the remaining number of attendees beyond 20" do
      attendees = create_list(:specialist, 30)
      event.attendees << attendees

      visit "/guild/events/#{event.uid}"
      expect(page).to have_content('+ 10')
    end
  end
end
