# frozen_string_literal: true

module Talkjs
  class Migrator
    attr_reader :api

    def initialize
      @api = TalkjsApi.new
    end

    def migrate!
      loop_through_all_conversations do |conversation|
        next if conversation["lastMessage"].blank?

        Talkjs::Conversation.new(api, conversation).migrate!
      end
    end

    private

    def loop_through_all_conversations(&block)
      last_id = nil
      loop do
        conversations = api.conversations(last_id)
        break if conversations.empty?

        conversations.each(&block)
        last_id = conversations.last["id"]
      end
    end
  end

  class Conversation
    attr_reader :conversation, :api, :id, :participants, :messages, :requirements

    def initialize(api, conversation)
      @api = api
      @id = conversation["id"]
      @requirements = {has_user: false, has_specialist: false, specialist_accepted_stage: false}
      load_participants(conversation)
    end

    def migrate!
      return if requirements.values.any?(false)

      puts "Migrating #{id}"
      @conversation = ::Conversation.find_or_create_by!(idempotency_key: id)
      create_conversation_participants
      load_messages
      migrate_messages
      conversation.destroy if conversation.messages.count.zero?
    end

    private

    def load_participants(conversation)
      @participants = {}
      conversation["participants"].each_key do |uid|
        @participants[uid] = account_for(uid)
      end
    end

    def create_conversation_participants
      @participants.each_value do |participant|
        ::ConversationParticipant.find_or_create_by!(conversation: conversation, account: participant)
      end
    end

    def load_messages
      @messages = []
      last_id = nil
      loop do
        new_messages = api.messages(id, last_id)
        break if new_messages.empty?

        last_id = new_messages.last["id"]
        @messages += new_messages
      end
      @messages = messages.reverse
    end

    def migrate_messages
      messages.each do |message|
        cm = conversation.messages.find_or_initialize_by(idempotency_key: message["id"])

        cm.author = author_for(message["senderId"])
        cm.content = message["text"]
        cm.created_at = Time.zone.at(message["createdAt"] / 1000)

        if message["attachment"]
          cm.attachments.purge
          uri = URI.parse(message["attachment"]["url"])
          attachment = uri.open
          filename = CGI.unescape(uri.path)[%r{/([^/]*)$}, 1] # https://rubular.com/r/iYJ3GPmyvJ19oA
          cm.attachments.attach(io: attachment, filename: filename)
        end

        if cm.content.blank? && cm.attachments.empty?
          Sentry.capture_message("Skipping weird message", extra: {message: message, conversation: conversation, takljs_id: id})
        else
          cm.save!
        end
      end
    end

    def account_for(uid)
      case uid
      when /^spe_/
        specialist = Specialist.find_by(uid: uid) || Specialist.first
        if specialist
          @requirements[:has_specialist] = true
          @requirements[:specialist_accepted_stage] = specialist.application_stage == "Accepted"
          specialist.account
        end
      when /^use_/
        user = User.find_by(uid: uid) || User.first
        if user
          requirements[:has_user] = true
          user.account
        end
      when /^sal_/, /marina/
        Account.find(20695) # Hardcode to Marina
      when /jonathanbailey/
        Account.find(28951) # Hardcode to Jonathan
      else
        puts "Unknown participant #{uid}"
        nil
      end
    end

    def author_for(uid)
      if participants.key?(uid)
        participants[uid]
      else
        @participants[uid] = account_for(uid)
      end
    end
  end
end

namespace :messages do
  task migrate_talkjs: :environment do
    migrator = Talkjs::Migrator.new
    migrator.migrate!
  end
end
