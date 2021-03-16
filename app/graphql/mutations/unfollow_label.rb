# frozen_string_literal: true

module Mutations
  class UnfollowLabel < Mutations::BaseMutation
    graphql_name "UnfollowLabel"
    argument :label_slug, ID, required: true

    field :success, Boolean, null: true

    def authorized?(**_args)
      requires_guild_user!
    end

    def resolve(label_slug:)
      label = ::Label.find_by!(slug: label_slug)
      current_user.unsubscribe_from!(label)

      {success: true}
    end
  end
end
