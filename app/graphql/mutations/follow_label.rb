# frozen_string_literal: true

module Mutations
  class FollowLabel < Mutations::BaseMutation
    graphql_name "FollowLabel"
    argument :label_slug, ID, required: true

    field :success, Boolean, null: true

    def authorized?(**_args)
      requires_guild_user!
    end

    def resolve(label_slug:)
      label = ::Label.find_by!(slug: label_slug)
      current_user.subscribe_to!(label)

      {success: true}
    end
  end
end
