# frozen_string_literal: true

module Guild
  module SpecialistsConcern
    extend ActiveSupport::Concern

    included do
      has_many :guild_posts, class_name: "Guild::Post", dependent: :destroy, inverse_of: :specialist
      has_many :guild_post_engagements, class_name: "Guild::PostEngagement", dependent: :destroy

      before_save :guild_joined_callbacks, if: -> { guild_changed? && guild }

      scope :guild_featured_members, -> { accepted.where.not(guild_featured_member_at: nil).order(guild_featured_member_at: :desc) }

      private

      def guild_joined_callbacks
        self.guild_joined_date ||= Time.current
        GuildAddFollowablesJob.perform_later(id)
      end
    end
  end
end
