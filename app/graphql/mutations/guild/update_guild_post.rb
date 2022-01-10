# frozen_string_literal: true

module Mutations
  module Guild
    class UpdateGuildPost < Mutations::BaseMutation
      description "Updates a new guild post"
      graphql_name "UpdateGuildPost"

      argument :audience_type, String, required: false
      argument :body, String, required: false
      argument :guild_post_id, ID, required: true
      argument :labels, [String], required: false
      argument :publish, Boolean, required: false
      argument :shareable, Boolean, required: false
      argument :title, String, required: false
      argument :type, String, required: false
      field :guild_post, Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_accepted_specialist!
      end

      def resolve(**args)
        guild_post = current_user.guild_posts.find(args[:guild_post_id])
        assignable = args.except(:publish, :guild_post_id, :labels)
        guild_post.assign_attributes(assignable)

        if args[:labels].present?
          labels = args[:labels].map { |name| Label.find_or_create_by(name:) }
          guild_post.labels = labels
        end

        # - A removed post cannot be published
        guild_post.status = "published" if args[:publish].present? && guild_post.status != "removed"
        guild_post.save!

        {guild_post:}
      end
    end
  end
end
