# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Messaging", type: :system, action_cable: :async do
  let(:dwight) { create(:account, first_name: "Dwight", specialist: create(:specialist)) }
  let(:jim) { create(:account, first_name: "Jim", specialist: create(:specialist)) }
  let(:michael) { create(:account, first_name: "Michael", user: create(:user), completed_tutorials: %w[onboarding feed]) }
  let!(:conversation) { conversation_with_participants([dwight, jim, michael]) }
  let(:next_work_day) { Time.current.next_weekday.beginning_of_day }

  before { allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview) }

  it "redirects to the first conversation" do
    authenticate_as(dwight.specialist)
    visit("/messages")
    expect(page).to have_current_path("/messages/#{conversation.uid}")
  end

  it "user can reply to a message" do
    authenticate_as(dwight.specialist)
    visit("/messages")
    fill_in("message", with: "Hey There!")
    click_on("Send")
    within("#messages") do
      expect(page).to have_selector("[data-status='SENT']", text: "Hey There!")
    end

    message = conversation.messages.last
    expect(message.content).to eq("Hey There!")
  end

  it "user can navigate to another conversation" do
    other = conversation_with_participants([dwight, jim])
    send_message(conversation, jim, "Hey There!")
    send_message(other, jim, "Other message!")
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}")

    within("#messages") do
      expect(page).to have_content("Hey There!")
      expect(page).not_to have_content("Other message")
    end

    find("##{other.uid}").click

    within("#messages") do
      expect(page).to have_content("Other message")
      expect(page).not_to have_content("Hey There!")
    end
  end

  it "user receives messages in realtime" do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}")
    send_message(conversation, jim, "Hey There!")
    expect(page).to have_content("Hey There!")
  end

  it "user can send attachments" do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}")

    attach_file(
      "message-attachments",
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )

    fill_in("message", with: "Look at this!")
    click_on("Send")
    within("#messages") do
      expect(page).to have_selector("[data-status='SENT']", text: "Look at this!")
      expect(page).to have_content("01.jpg")
    end
  end

  it "renders conversations in order of most recent message" do
    conversation2 = conversation_with_participants([dwight, jim])
    conversation3 = conversation_with_participants([jim, michael])

    send_message(conversation, dwight, "Hey", created_at: 5.minutes.ago)
    send_message(conversation2, dwight, "Hi", created_at: 4.minutes.ago)
    send_message(conversation3, dwight, "Hello", created_at: 2.minutes.ago)

    authenticate_as(jim.specialist)
    visit("/messages/#{conversation3.uid}")
    expect(find("[data-testid='conversationLink']:nth-child(1)")["id"]).to eq(conversation3.uid)
    expect(find("[data-testid='conversationLink']:nth-child(2)")["id"]).to eq(conversation2.uid)
    expect(find("[data-testid='conversationLink']:nth-child(3)")["id"]).to eq(conversation.uid)
    within("#messages") do
      expect(page).to have_content("Hello")
    end

    send_message(conversation, dwight, "perfectenschlag!")
    expect(page).to have_content("perfectenschlag!")
    expect(find("[data-testid='conversationLink']:nth-child(1)")["id"]).to eq(conversation.uid)
    expect(find("[data-testid='conversationLink']:nth-child(2)")["id"]).to eq(conversation3.uid)
    expect(find("[data-testid='conversationLink']:nth-child(3)")["id"]).to eq(conversation2.uid)
  end

  it "shows disconnected notice when browser goes offline" do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}")
    page.driver.browser.network_conditions = {offline: true, latency: 0, throughput: 0}
    expect(page).to have_content("Your connection has been lost, please refresh the page")
    page.driver.browser.network_conditions = {offline: false, latency: 0, throughput: 0}
  end

  it "marks a conversation as read when it is viewed" do
    conversation2 = conversation_with_participants([michael, dwight])
    send_message(conversation2, dwight, "Hey")
    send_message(conversation2, dwight, "How are you?")
    authenticate_as(michael.user)
    visit("/messages/#{conversation.uid}")
    participant = conversation2.participants.find_by(account: michael)
    expect(participant.last_read_at).to be_nil
    expect(page).to have_selector("[data-testid='conversationUnreadCount']")
    find("##{conversation2.uid}").click
    expect(page).not_to have_selector("[data-testid='conversationUnreadCount']")
    expect { participant.reload.last_read_at.present? }.to become_truthy
  end

  it "shows an upcoming call for a client" do
    conversation2 = conversation_with_participants([michael, dwight])
    interview = create(:interview, accounts: [dwight, michael], status: "Call Scheduled")
    authenticate_as(interview.user)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    click_on("Call with #{interview.specialist.first_name}")
    expect(page).to have_content(/scheduled to take place/i)
    find('[aria-label="Back"]').click
    expect(page).to have_content("Upcoming calls")
  end

  it "shows an upcoming call for a specialist" do
    conversation2 = conversation_with_participants([michael, dwight])
    interview = create(:interview, accounts: [dwight, michael], status: "Call Scheduled")
    authenticate_as(interview.specialist)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    click_on("Call with #{interview.user.first_name}")
    expect(page).to have_content(/scheduled to take place/i)
    find('[aria-label="Back"]').click
    expect(page).to have_content("Upcoming calls")
  end

  it "shows upcoming calls indicators for a client" do
    conversation_with_participants([michael, dwight])
    interview = create(:interview, accounts: [dwight, michael], status: "Call Scheduled", requested_by: michael)
    authenticate_as(interview.user)
    visit("/")
    find("*[aria-label='Messages dropdown']").click
    expect(page).to have_content("Dwight")
    find("*[aria-label='1 upcoming call']").hover
    expect(page).to have_content("1 upcoming call")
    visit("/messages")
    first("*[aria-label='1 upcoming call']").hover
    expect(page).to have_content("1 upcoming call")
  end

  it "shows upcoming calls indicator for a specialist" do
    conversation_with_participants([michael, dwight])
    interview = create(:interview, accounts: [dwight, michael], status: "Call Scheduled")
    authenticate_as(interview.specialist)
    visit("/messages")
    first("*[aria-label='1 upcoming call']").hover
    expect(page).to have_content("1 upcoming call")
  end

  it "shows empty state of upcoming calls section" do
    conversation2 = conversation_with_participants([michael, dwight])
    authenticate_as(michael.user)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    expect(page).to have_content("You don't have any upcoming calls with #{dwight.first_name}")
    expect(page).to have_content("Schedule a call")
  end

  it "requests and confirm a call from a client to specialist" do
    conversation2 = conversation_with_participants([michael, dwight])
    authenticate_as(michael.user)
    visit("/messages/#{conversation2.uid}")
    click_on("Schedule a call")
    expect(page).to have_content("Request a call with #{dwight.first_name}")
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:30")}']").click
    click_on("Next")
    expect(page).to have_content("Attach a message")
    click_on("Request without message")
    expect(page).to have_content("Request sent")
    click_on("Okay")
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    expect(page).to have_content("#{michael.name} requested a call with you")
    click_on("Respond")
    expect(page).to have_content("New call request")
    click_button("View availability")
    click_on(next_work_day.strftime("%-d %b %Y"))
    expect(page).to have_content("Select a time for your call")
    click_on("10:00 AM - 10:30 AM")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    click_button("Confirm Call")
    expect(page).to have_content("Call Scheduled")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{michael.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
    authenticate_as(michael.user)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{michael.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
  end

  it "requests and confirm a call from a specialist to client" do
    conversation2 = conversation_with_participants([michael, dwight])
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation2.uid}")
    click_on("Schedule a call")
    expect(page).to have_content("Request a call with #{michael.first_name}")
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:30")}']").click
    click_on("Next")
    expect(page).to have_content("Attach a message")
    click_on("Request without message")
    expect(page).to have_content("Request sent")
    click_on("Okay")
    authenticate_as(michael.user)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    expect(page).to have_content("#{dwight.name} requested a call with you")
    click_on("Respond")
    expect(page).to have_content("New call request")
    click_button("View availability")
    click_on(next_work_day.strftime("%-d %b %Y"))
    expect(page).to have_content("Select a time for your call")
    click_on("10:00 AM - 10:30 AM")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    click_button("Confirm Call")
    expect(page).to have_content("Call Scheduled")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{dwight.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{dwight.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
  end

  it "requests and confirm a call from a specialist to specialist" do
    conversation2 = conversation_with_participants([jim, dwight])
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation2.uid}")
    click_on("Schedule a call")
    expect(page).to have_content("Request a call with #{jim.first_name}")
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 10:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 11:30")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:00")}']").click
    find("[aria-label='#{next_work_day.strftime("%-d %b %Y, 12:30")}']").click
    click_on("Next")
    expect(page).to have_content("Attach a message")
    click_on("Request without message")
    expect(page).to have_content("Request sent")
    click_on("Okay")
    authenticate_as(jim.specialist)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("Upcoming calls")
    expect(page).to have_content("#{dwight.name} requested a call with you")
    click_on("Respond")
    expect(page).to have_content("New call request")
    click_button("View availability")
    click_on(next_work_day.strftime("%-d %b %Y"))
    expect(page).to have_content("Select a time for your call")
    click_on("10:00 AM - 10:30 AM")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    click_button("Confirm Call")
    expect(page).to have_content("Call Scheduled")
    expect(page).to have_content(next_work_day.strftime("%A, %d %B"))
    expect(page).to have_content("10:00 AM - 10:30 AM")
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{dwight.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation2.uid}")
    expect(page).to have_content("#{dwight.name} scheduled a call for #{next_work_day.strftime("%d %B %Y")} at 10:00AM")
  end

  it "doesn't show upcoming calls section in a group chat" do
    authenticate_as(michael.user)
    visit("/messages/#{conversation.uid}")
    expect(page).not_to have_content("Upcoming calls")
  end

  def conversation_with_participants(participants)
    create(:conversation) do |conversation|
      participants.each do |participant|
        create(:conversation_participant, conversation:, account: participant)
      end
    end
  end

  def send_message(conversation, author, content, **extra)
    message = create(:message, {
      conversation:,
      content:,
      author:
    }.merge(extra))

    message.schedule_email_notifications
    message.update_participants
  end
end
