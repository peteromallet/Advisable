# frozen_string_literal: true

module Types
  module Guild
    module AuthorInterface
      include Types::BaseInterface
      field_class BaseField

      field :authored, Boolean, null: false do
        description "Whether the current user is the author of the resource"
      end
      def authored
        object.specialist_id == context[:current_user]&.id
      end

      field :author, Types::SpecialistType, null: false do
        description "The author of the resource"
      end
      def author
        object.specialist
      end
    end
  end
end
