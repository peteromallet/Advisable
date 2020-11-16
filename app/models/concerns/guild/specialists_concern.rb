module Guild
  module SpecialistsConcern
    extend ActiveSupport::Concern

    included do
      acts_as_tagger

      # specialist.follow(Guild::Topic.last)
      # specialist.follows.where(followable_type: 'ActsAsTaggableOn::Tag')
      acts_as_follower

      has_many :guild_posts, class_name: 'Guild::Post', dependent: :destroy
      has_many :guild_comments, class_name: 'Guild::Comment', dependent: :destroy
      has_many :guild_post_comments,
               -> { published.order(created_at: :desc) },
               through: :guild_posts, source: :comments
      has_many :guild_post_reactions,
               -> { order(created_at: :desc) },
               through: :guild_posts,
               source: :reactions,
               class_name: 'Guild::Reaction'

      before_save :set_guild_joined_date, if: -> { guild_changed? }

      scope :guild, -> { where(guild: true) }
      scope :guild_featured_members, lambda {
                                       guild.
                                         where("guild_data->'guild_featured_member_at' IS NOT NULL").
                                         guild_data_order(guild_featured_member_at: :desc)
                                     }
      jsonb_accessor :guild_data,
                     guild_joined_date: :datetime,
                     guild_notifications_last_read: [:datetime, {default: Time.zone.at(0)}],
                     guild_calendly_link: [:string],
                     guild_featured_member_at: :datetime

      def guild_your_posts
        guild_posts.where(status: %w[published draft])
      end

      def touch_guild_notifications_last_read
        update!(guild_notifications_last_read: Time.current)
      end

      def guild_unread_messages
        chat_client = TwilioChat::Client.new(identity: uid)
        chat_client.has_unread_messages?
      rescue Twilio::REST::RestError => e
        # https://www.twilio.com/docs/api/errors/20404
        if e.code == 20404
          false
        else
          raise
        end
      end

      def guild_unread_notifications
        return false unless guild_activity.any?

        guild_activity.first.created_at > guild_notifications_last_read
      end

      def guild_activity
        @guild_activity ||= [
          guild_post_comments.limit(10),
          guild_post_reactions.limit(10)
        ].flatten.sort { |a, b| b.created_at <=> a.created_at }

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
        #       "'gave thanks' as context,
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

      protected

      def set_guild_joined_date
        return unless guild

        self.guild_joined_date ||= Time.current
      end
    end
  end
end
