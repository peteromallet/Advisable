# frozen_string_literal: true

module Types
  class ViewerUnion < Types::BaseUnion
    description "Represents a viewer"
    possible_types Types::User, Types::SpecialistType

    def self.resolve_type(object, _)
      if object.is_a?(::Specialist)
        Types::SpecialistType
      else
        Types::User
      end
    end
  end
end
