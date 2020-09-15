class Types::MutationType < GraphQL::Schema::Object
  EXCLUDED_CLASSES = [:BaseMutation, :Helpers, :Guild].freeze
  (Mutations.constants - EXCLUDED_CLASSES).each do |klass|
    send(:field, klass.to_s.underscore, mutation: "Mutations::#{klass}".constantize)
  end

  # Guild
  field :create_guild_comment, mutation: Mutations::Guild::CreateComment
  field :delete_guild_comment, mutation: Mutations::Guild::DeleteComment
end
