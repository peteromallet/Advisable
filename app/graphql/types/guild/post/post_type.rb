# frozen_string_literal: true

class Types::Guild::Post::PostType < Types::BaseType
  graphql_name "GuildPostGeneral"

  implements Types::Guild::PostInterface, Types::Guild::AuthorInterface
end
