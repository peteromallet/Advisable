# frozen_string_literal: true

module Mutations
  class FollowLabel < Mutations::BaseMutation
    graphql_name "FollowLabel"
    argument :label_slug, ID, required: true

    field :label, Types::LabelType, null: true

    def authorized?(**_args)
      requires_accepted_specialist!
    end

    def resolve(label_slug:)
      label = ::Label.find_by!(slug: label_slug)
      current_user.subscribe_to!(label)

      {label: label}
    end
  end
end
