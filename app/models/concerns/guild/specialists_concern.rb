# frozen_string_literal: true

module Guild
  module SpecialistsConcern
    extend ActiveSupport::Concern

    included do
      acts_as_tagger
      acts_as_follower

      has_many :guild_posts, class_name: 'Guild::Post', dependent: :destroy, inverse_of: :specialist
      has_many :guild_comments, class_name: 'Guild::Comment', dependent: :destroy
      has_many :guild_post_comments,
               -> { published.order(created_at: :desc) },
               through: :guild_posts, source: :comments
      has_many :guild_post_reactions,
               -> { order(created_at: :desc) },
               through: :guild_posts,
               source: :reactions,
               class_name: 'Guild::Reaction'

      has_many :guild_followed_topics, through: :follows, source: :followable, source_type: "ActsAsTaggableOn::Tag"
      has_many :guild_notifications, -> { guild }, through: :account, source: :notifications

      before_save :guild_joined_callbacks, if: -> { guild_changed? && guild }

      scope :guild, -> { where(guild: true) }
      scope :guild_featured_members, lambda {
                                       guild.
                                         where("guild_data->'guild_featured_member_at' IS NOT NULL").
                                         guild_data_order(guild_featured_member_at: :desc)
                                     }
      jsonb_accessor :guild_data,
                     guild_joined_date: :datetime,
                     guild_calendly_link: [:string],
                     guild_featured_member_at: :datetime

      register_tutorial 'GUILD'

      def touch_guild_notifications_read_at
        return unless guild_unread_notifications

        guild_notifications.unread.find_each do |notification|
          notification.update!(read_at: Time.current)
        end
      end

      def guild_unread_notifications
        guild_notifications.unread.any?
      end

      protected

      def guild_joined_callbacks
        self.guild_joined_date ||= Time.current
        GuildAddFollowablesJob.perform_later(id)
      end
    end
  end
end
