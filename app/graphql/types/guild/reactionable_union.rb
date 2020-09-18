class Types::Guild::ReactionableUnion < Types::BaseUnion
  graphql_name 'GuildReactionableUnion'

  description "The Guild::Reaction's relation which could be a comment or post"

  # Note: The graphql spec does not allow a union comprised of an Interface
  #     so we will need to extrapolate the interface into individual types here
  #     if anything beyond the base type if needed

  possible_types Types::Guild::CommentType, Types::Guild::Post::PostType

  def self.resolve_type(object, _context)
    case object.class.name
    when 'Guild::Comment'
      Types::Guild::CommentType
    else
      Types::Guild::Post::PostType
    end
  end
end
