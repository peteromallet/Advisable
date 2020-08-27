class Types::Guild::Post::AdviceRequiredType < Types::BaseType
  # implements Types::Guild::PostType

  field :need_help, Boolean, null: false do
    description "Whether the guild post has been flagged as needing help"
  end
end
