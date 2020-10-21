class Types::Guild::Post::AdviceRequiredType < Types::BaseType
  implements Types::Guild::PostInterface

  graphql_name "GuildPostAdviceRequired"

  field :need_help, Boolean, null: true do
    description "Whether the guild post has been flagged as needing help"
  end
  def need_help
    object.data["need_help"]
  end
end
