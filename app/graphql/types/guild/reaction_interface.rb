# frozen_string_literal: true

module Types
  module Guild
    module ReactionInterface
      include Types::BaseInterface
      field_class BaseField

      orphan_types Types::Guild::CommentType

      description "Fields for a post reaction"

      field :reactions_count, Integer, null: true do
        description 'The number of reactions for the guild resource'
      end
      def reactions_count
        return unless current_user == object.specialist

        object.reactionable_count
      end

      field :reacted, Boolean, null: false do
        description 'Whether the current_user has reacted to the guild resource'
      end
      def reacted
        object.reactions.exists?(specialist: context[:current_user])
      end

      field :kind, String, null: false
    end
  end
end
