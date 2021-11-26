# frozen_string_literal: true

module Types
  module Guild
    class ReactionableUnion < Types::BaseUnion
      graphql_name "GuildReactionableUnion"

      description "The Guild::Reaction's relation which could be a comment or post"

      # NOTE: The graphql spec does not allow a union comprised of an Interface
      #     so we will need to extrapolate the interface into individual types here
      #     if anything beyond the base type if needed

      possible_types Types::Guild::Post::PostType

      def self.resolve_type(_object, _context)
        Types::Guild::Post::PostType
      end
    end
  end
end
