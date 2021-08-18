# frozen_string_literal: true

module Talkjs
  class Migrator
    attr_reader :api, :conversations

    def initialize
      @api = TalkjsApi.new
    end

    def migrate!
      load_all_conversations
      conversations.each do |conversation|
        Talkjs::Conversation.new(api, conversation).migrate!
      end
    end

    private

    def load_all_conversations
      @conversations = api.conversations
      # loop through via startedafter
    end
  end

  class Conversation
    attr_reader :conversation, :api, :id, :participants, :specialist, :user, :sales_person, :messages

    def initialize(api, conversation)
      @api = api
      @id = conversation["id"]
      load_participants(conversation)
      @conversation = ::Conversation.create!
    end

    def migrate!
      return if irrelevant?

      puts "Migrating #{id}"

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
          raise "Unknown participant #{uid}"
        end
      end
    end

    def irrelevant?
      specialist.nil? || specialist.application_stage != "Accepted" || user.nil?
    end

    def create_conversation_participants
      @participants.each_value do |participant|
        ::ConversationParticipant.create!(conversation: conversation, account: participant)
      end
    end

    def load_messages
      @messages = api.messages(id)
      # loop through via startedafter
    end

    def migrate_messages
      messages.each do |message|
        cm = conversation.messages.build(
          author: participants[message["senderId"]],
          content: message["text"]
        )

        if message["attachment"]
          cm.content = "Attachment"
          uri = URI.parse(message["attachment"]["url"])
          attachment = uri.open
          filename = CGI.unescape(uri.path)[%r{/([^/]*)$}, 1] # https://rubular.com/r/iYJ3GPmyvJ19oA
          cm.attachments.attach(io: attachment, filename: filename)
        end

        if cm.content.present?
          cm.save!
        else
          puts "Weird message: #{message}"
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
