# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Event view', type: :system do
  let(:account)    { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, :guild, account: account) }
  let(:host)       { create(:specialist, :guild) }
  let!(:event)     { create(:event, host: host, url: "http://event.test") }

  context "when logged in" do
    before do
      authenticate_as(specialist)
    end

    context "when viewing an event" do
      it "displays the event details in the users timezone" do
        override_tz = "America/New_York"
        ENV['TZ'] = override_tz
        Capybara.using_session(override_tz) do
          Time.use_zone(override_tz) do
            visit "/events/#{event.uid}"
            expect(page).to have_content(event.title)
            expect(page).to have_content(event.description)

            starts_at = event.starts_at.strftime("%-d %b at %-l:%M%P")
            expect(page).to have_content(starts_at)
            expect(page).to have_text(event.host.name)

            time_start = event.starts_at.strftime("%-l:%M%P")
            time_end = event.ends_at.strftime("%-l:%M%P %Z")
            expect(page).to have_text(/#{time_start} - #{time_end}/)
          end
        end
      end

      it 'can be registered or unregistered for' do
        other_account = create(:account, first_name: "Other")
        event.attendees << create(:specialist, account: other_account)
        visit "/events/#{event.uid}"
        click_on("Register for event")
        attendees = page.find(:css, "*[data-testid=attendees]")
        expect(attendees).to have_content(specialist.first_name)

        click_on("Unregister")
        expect(attendees).not_to have_content(specialist.first_name)
      end

      it "does not display a register button if the viewer is the host" do
        event.update!(host: specialist)

        visit "/events/#{event.uid}"
        expect(page).to have_content(event.title)
        expect(page).to have_button('Register for event', disabled: true)
      end

      it "shows the remaining number of attendees beyond 100" do
        attendees = create_list(:specialist, 110)
        event.attendees << attendees

        visit "/events/#{event.uid}"
        expect(page).to have_content('+ 10')
      end

      context "with event status notices" do
        it "has a notice if event is starting soon" do
          event.update!(starts_at: 55.minutes.from_now, ends_at: 1.hour.from_now)
          visit "/events/#{event.uid}"

          expect(page).to have_content("This event is starting soon")
        end

        it "has a notice if the event is in progress" do
          event.update!(starts_at: 5.minutes.ago, ends_at: 1.hour.from_now)
          visit "/events/#{event.uid}"

          expect(page).to have_content("This event is in progress")
        end

        it "has a notice if the event has ended" do
          event.update!(starts_at: 10.minutes.ago, ends_at: 5.minutes.ago)
          visit "/events/#{event.uid}"
          expect(page).to have_content("This event has ended")
        end
      end

      context "with status transitions" do
        it "changes from Unregister to Join" do
          event.update!(starts_at: 5.seconds.from_now, ends_at: 5.minutes.from_now)
          event.attendees << specialist
          visit "/events/#{event.uid}"

          expect(page).to have_button('Unregister')
          expect(page).to have_button('Join', wait: 10)
          expect(page).to have_content("This event is in progress")
          expect(page).not_to have_button('Register')
        end

        it "removes the Join button if ended" do
          event.update!(starts_at: Time.zone.now, ends_at: 5.seconds.from_now)
          visit "/events/#{event.uid}"

          expect(page).to have_button('Join')
          expect(page).not_to have_button('Join', wait: 10)
          expect(page).to have_content("This event has ended")
        end
      end
    end
  end

  context "when not logged in" do
    it "is still viewable" do
      visit "/events/#{event.uid}"

      expect(page).to have_button('Register for event')
      expect(page).to have_content(event.title)
    end

    it "is redirected to login page when the attempting to join the event" do
      visit "/events/#{event.uid}"

      click_on('Register for event')
      expect(page).to have_content("Please sign in to your account")
    end
  end
end
