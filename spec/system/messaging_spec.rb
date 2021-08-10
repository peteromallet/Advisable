# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Messaging', type: :system, action_cable: :async do
  let(:dwight) { create(:account, first_name: "Dwight", specialist: create(:specialist)) }
  let(:jim) { create(:account, first_name: "Jim", specialist: create(:specialist)) }
  let(:michael) { create(:account, first_name: "Michael", user: create(:user)) }
  let!(:conversation) { conversation_with_participants([dwight, jim, michael]) }

  it 'redirects to the first conversation' do
    authenticate_as(dwight.specialist)
    visit("/messages?version=2")
    expect(page).to have_current_path("/messages/#{conversation.uid}")
  end

  it 'user can reply to a message' do
    authenticate_as(dwight.specialist)
    visit("/messages?version=2")
    fill_in("message", with: "Hey There!")
    click_on("Reply")
    within("#messages") do
      expect(page).to have_selector("[data-status='SENT']", text: "Hey There!")
    end

    message = conversation.messages.last
    expect(message.content).to eq("Hey There!")
  end

  it 'user can navigate to another conversation' do
    other = conversation_with_participants([dwight, jim])
    send_message(conversation, jim, "Hey There!")
    send_message(other, jim, "Other message!")
    authenticate_as(dwight.specialist)
    visit("/messages?version=2")

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

  it 'user receives messages in realtime' do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}?version=2")
    send_message(conversation, jim, "Hey There!")
    expect(page).to have_content("Hey There!")
  end

  it 'user can send attachments' do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}?version=2")

    attach_file(
      'message-attachments',
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )

    fill_in("message", with: "Look at this!")
    click_on("Reply")
    within("#messages") do
      expect(page).to have_selector("[data-status='SENT']", text: "Look at this!")
      expect(page).to have_content("01.jpg")
    end
  end

  it 'renders conversations in order of most recent message' do
    conversation2 = conversation_with_participants([dwight, jim])
    conversation3 = conversation_with_participants([jim, michael])

    send_message(conversation, dwight, "Hey", created_at: 5.minutes.ago)
    send_message(conversation2, dwight, "Hi", created_at: 4.minutes.ago)
    send_message(conversation3, dwight, "Hello", created_at: 2.minutes.ago)

    authenticate_as(jim.specialist)
    visit("/messages?version=2")
    expect(find("[data-testid='conversationLink']:nth-child(1)")['id']).to eq(conversation3.uid)
    expect(find("[data-testid='conversationLink']:nth-child(2)")['id']).to eq(conversation2.uid)
    expect(find("[data-testid='conversationLink']:nth-child(3)")['id']).to eq(conversation.uid)

    send_message(conversation, dwight, "perfectenschlag!")
    expect(page).to have_content("perfectenschlag!")
    expect(find("[data-testid='conversationLink']:nth-child(1)")['id']).to eq(conversation.uid)
    expect(find("[data-testid='conversationLink']:nth-child(2)")['id']).to eq(conversation3.uid)
    expect(find("[data-testid='conversationLink']:nth-child(3)")['id']).to eq(conversation2.uid)
  end

  it 'shows disconnected notice when browser goes offline' do
    authenticate_as(dwight.specialist)
    visit("/messages/#{conversation.uid}?version=2")
    page.driver.browser.network_conditions = {offline: true, latency: 0, throughput: 0}
    expect(page).to have_content("Your connection has been lost, please refresh the page")
    page.driver.browser.network_conditions = {offline: false, latency: 0, throughput: 0}
  end

  it 'marks a conversation as read when it is viewed' do
    conversation2 = conversation_with_participants([michael, dwight])
    send_message(conversation2, dwight, "Hey")
    send_message(conversation2, dwight, "How are you?")
    authenticate_as(michael.user)
    visit("/messages/#{conversation.uid}?version=2")
    participant = conversation2.participants.find_by(account: michael)
    expect(participant.last_read_at).to be_nil
    expect(page).to have_selector("[data-testid='conversationUnreadCount']")
    find("##{conversation2.uid}").click
    expect(page).not_to have_selector("[data-testid='conversationUnreadCount']")
    expect { participant.reload.last_read_at.present? }.to become_truthy
  end

  def conversation_with_participants(participants)
    create(:conversation) do |conversation|
      participants.each do |participant|
        create(:conversation_participant, conversation: conversation, account: participant)
      end
    end
  end

  def send_message(conversation, author, content, **extra)
    message = create(:message, {
      conversation: conversation,
      content: content,
      author: author
    }.merge(extra))

    message.announce_message
  end
end
