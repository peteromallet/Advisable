# frozen_string_literal: true

module Guild
  module SpecialistsConcern
    extend ActiveSupport::Concern

    included do
      has_many :guild_posts, class_name: 'Guild::Post', dependent: :destroy, inverse_of: :specialist
      has_many :guild_comments, class_name: 'Guild::Comment', dependent: :destroy
      has_many :guild_post_comments, -> { published.order(created_at: :desc) }, through: :guild_posts, source: :comments
      has_many :guild_post_reactions, -> { order(created_at: :desc) }, through: :guild_posts, source: :reactions, class_name: 'Guild::Reaction'
      has_many :guild_post_engagements, class_name: 'Guild::PostEngagement', dependent: :destroy

      before_save :guild_joined_callbacks, if: -> { guild_changed? && guild }

      scope :guild, -> { where(guild: true) }
      scope :guild_featured_members, -> { guild.where.not(guild_featured_member_at: nil).order(guild_featured_member_at: :desc) }

      private

      def guild_joined_callbacks
        self.guild_joined_date ||= Time.current
        GuildAddFollowablesJob.perform_later(id)
      end
    end
  end
end
