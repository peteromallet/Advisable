# frozen_string_literal: true

module Toby
  module Lookups
    module Conversations
      class ParticipantName < Attributes::TextArray
        include Lookup

        filter "contains...", Filters::StringContains do |records, _attribute, value|
          if value.any? && value.first.present?
            query = records.joins(participants: :account)
            names = value.first.split
            names.each do |name|
              query = query.where("accounts.first_name ILIKE ?", "%#{name}%").
                or(query.where("accounts.last_name ILIKE ?", "%#{name}%"))
            end
            query
          else
            records
          end
        end

        def lazy_read_class
          Toby::Lazy::Base
        end

        def includes
          [:account]
        end

        def via
          :id
        end

        def column
          :conversation_id
        end

        def lazy_model
          ConversationParticipant
        end

        def lazy_read(participant)
          participant&.account&.name
        end
      end
    end
  end
end
