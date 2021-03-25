# frozen_string_literal: true

module Mutations
  module Guild
    class UpdateGuildPost < Mutations::BaseMutation
      description "Updates a new guild post"
      graphql_name "UpdateGuildPost"

      argument :guild_post_id, ID, required: true
      argument :body, String, required: false
      argument :title, String, required: false
      argument :publish, Boolean, required: false
      argument :type, String, required: false
      argument :audience_type, String, required: false
      argument :guild_topic_names, [String], required: false, deprecation_reason: "Use labels instead"
      argument :labels, [String], required: false
      argument :shareable, Boolean, required: false

      field :guild_post, Types::Guild::PostInterface, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(**args)
        guild_post = current_user.guild_posts.find(args[:guild_post_id])
        assignable = args.except(:publish, :guild_post_id, :guild_topic_names, :labels)

        guild_post.assign_attributes(assignable)

        labels = args[:labels].presence || args[:guild_topic_names].presence

        if labels.presence
          guild_post.guild_topic_list = labels

          # TODO: AATO - save list, so we persist tags and taggings
          guild_post.save
          # TODO: AATO - reload to get the new tags, find topics by those ids and get their label mirrors
          guild_post.labels = ::Guild::Topic.where(id: guild_post.reload.guild_topics.pluck(:id)).map(&:label_mirror)
        end

        # - A removed post cannot be published
        guild_post.status = "published" if args[:publish].present? && guild_post.status != "removed"

        guild_post.save!

        {guild_post: guild_post}
      end
    end
  end
end
