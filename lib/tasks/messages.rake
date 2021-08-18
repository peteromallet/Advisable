# frozen_string_literal: true

module Talkjs
  class Migrator
    attr_reader :api

    def initialize
      @api = TalkjsApi.new
    end

    def migrate!
      loop_through_all_conversations do |conversation|
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
    attr_reader :conversation, :api, :id, :participants, :specialist, :user, :sales_person, :messages

    def initialize(api, conversation)
      @api = api
      @id = conversation["id"]
      load_participants(conversation)
    end

    def migrate!
      return if irrelevant?

      puts "Migrating #{id}"
      @conversation = ::Conversation.find_or_create_by!(idempotency_key: id)
      create_conversation_participants
      load_messages
      migrate_messages
    end

    private

    def load_participants(conversation)
      @participants = {}
      conversation["participants"].each_key do |uid|
        case uid
        when /^spe_/
          raise "Multiple specialists!" if specialist

          @specialist = Specialist.find_by(uid: uid)
          @participants[uid] = specialist.account if specialist
        when /^use_/
          raise "Multiple users!" if user

          @user = User.find_by(uid: uid)
          @participants[uid] = user.account if user
        when /^sal_/
          # Hardcode to Marina
          @sales_person = SalesPerson.find(40)
          @participants[uid] = Account.find(20695)
        else
          puts "Unknown participant #{uid}"
        end
      end
    end

    def irrelevant?
      specialist.nil? || specialist.application_stage != "Accepted" || user.nil?
    end

    def create_conversation_participants
      @participants.each_value do |participant|
        ::ConversationParticipant.find_or_create_by!(conversation: conversation, account: participant)
      end
    end

    def load_messages
      @messages = api.messages(id)
      loop do
        new_messages = api.messages(id, messages.last["id"])
        break if new_messages.empty?

        @messages = messages + new_messages
      end
      @messages = messages.reverse
    end

    def migrate_messages
      messages.each do |message|
        cm = conversation.messages.find_or_initialize_by(idempotency_key: message["id"])

        cm.author = participants[message["senderId"]]
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
  end
end

namespace :messages do
  task migrate_talkjs: :environment do
    migrator = Talkjs::Migrator.new
    migrator.migrate!
  end
end
