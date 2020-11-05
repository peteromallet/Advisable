class Types::Guild::ActivityUnion < Types::BaseUnion
  graphql_name "GuildActivityUnion"

  description 'Represents either a guild post reaction or guild post comment activity'
  possible_types Types::Guild::CommentType, Types::Guild::ReactionType

  def self.resolve_type(object, _context)
    case object.class.name
    when "Guild::Comment" then Types::Guild::CommentType
    when "Guild::Reaction" then Types::Guild::ReactionType
    else
      raise "Unknown activity type"
    end
  end
end
