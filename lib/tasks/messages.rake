# frozen_string_literal: true

module Twilio
  class Migrator
    attr_reader :client, :service

    def initialize
      @client = Twilio::REST::Client.new(ENV["TWILIO_SID"], ENV["TWILIO_AUTH_TOKEN"])
      @service = client.chat.services(ENV["TWILIO_CHAT_SERVICE_SID"])
      @authors = {}
    end

    def migrate!
      service.channels.list.each do |channel|
        migrate_channel!(channel)
      end
    end

    private

    def migrate_channel!(channel)
      conversation = find_or_create_conversation!(channel)

      if conversation.nil?
        puts "Skipping conversation #{channel.sid} because it has no active participants"
        return
      end

      puts "Migrating channel #{channel.sid}"

      channel.messages.list.each do |message|
        cm = conversation.messages.find_or_initialize_by(idempotency_key: message.sid)

        cm.author = author_for(message.from)
        cm.content = message.body
        cm.created_at = message.date_created

        attributes = JSON[message.attributes]
        cm.guild_post_id = attributes["post"] if attributes["post"]
        cm.metadata = {calendly_url: attributes["calendlyLink"]} if attributes["calendlyLink"]

        cm.save!
      end
    end

    def find_or_create_conversation!(channel)
      conversation = Conversation.find_by(idempotency_key: channel.sid)
      return conversation if conversation

      uids = JSON[channel.attributes]["members"]&.values
      accounts = Specialist.where(uid: uids).map(&:account)

      return if accounts.empty?

      conversation = Conversation.by_accounts(accounts)
      conversation.update_columns(idempotency_key: channel.sid)
      conversation
    end

    def author_for(uid)
      return @authors[uid] if @authors.key?(uid)

      @authors[uid] = Specialist.find_by(uid: uid)&.account
    end
  end
end

namespace :messages do
  task migrate_twilio: :environment do
    migrator = Twilio::Migrator.new
    migrator.migrate!
  end
end
