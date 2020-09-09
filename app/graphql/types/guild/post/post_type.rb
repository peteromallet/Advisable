class Types::Guild::Post::PostType < Types::BaseType
  graphql_name 'GuildPostGeneral'

  implements Types::Guild::PostInterface,
             Types::Guild::AuthorInterface,
             Types::Guild::ReactionInterface
end
