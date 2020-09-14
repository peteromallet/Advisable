module Guild
  module SpecialistsConcern
    extend ActiveSupport::Concern

    included do
      has_many :guild_posts, class_name: "Guild::Post"
      has_many :guild_comments, class_name: "Guild::Comment"
      has_many :guild_post_comments, -> { published },
               through: :guild_posts, source: :comments
      has_many :guild_post_reactions,
               through: :guild_posts, source: :reactions, class_name: "Guild::Reaction"

      # TODO: This is a wip
      def guild_activity
        [
          guild_post_comments.limit(10),
          guild_post_reactions.limit(10)
        ].flatten.sort_by(&:created_at)

        #  Something more scalable post launch but limited in the graph
        #    returns [{context:, post_id:, created_at, specialist_id:}, ...]
        #
        # sql = ActiveRecord::Base.connection.unprepared_statement {
        #   "(
        #     (#{guild_post_comments.joins(:specialist).select(
        #       "guild_comments.body as context,
        #       'Guild::Comment' as type,
        #       guild_comments.guild_post_id as post_id,
        #       guild_comments.created_at,
        #       specialists.id as specialist_id"
        #     ).to_sql})
        #       UNION ALL
        #     (#{guild_post_reactions.joins(:specialist).select(
        #       "'reacted' as context,
        #       'Guild::Reaction' as type,
        #       guild_reactions.reactionable_id as post_id,
        #       guild_reactions.created_at,
        #       specialists.id as specialist_id"
        #     ).to_sql})
        #     ORDER BY created_at DESC
        #     LIMIT 20
        #   )"
        # }
        # ActiveRecord::Base.connection.execute(sql)
      end
    end
  end
end

