# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    class BoostError < StandardError; end
    self.store_full_sti_class = false

    # NOTE: Can't leverage scopes when inheriting from ActsAsTaggableOn::Tag
    acts_as_ordered_taggable_on :guild_topics

    POST_TYPES = %w[Post AdviceRequired CaseStudy Opportunity].freeze
    AUDIENCE_TYPES = %w[skills industries locations none other].freeze

    belongs_to :specialist
    has_one :account, through: :specialist
    has_many :reactions, as: :reactionable, dependent: :destroy
    has_many :comments, -> { published }, foreign_key: 'guild_post_id', class_name: 'Guild::Comment', inverse_of: 'post'
    has_many :parent_comments, -> { where(parent_comment_id: nil).published }, class_name: 'Guild::Comment', foreign_key: 'guild_post_id', inverse_of: 'post'
    has_many :images, class_name: 'Guild::PostImage', foreign_key: 'guild_post_id', inverse_of: 'post', dependent: :destroy
    has_many :engagements, class_name: 'Guild::PostEngagement', foreign_key: 'guild_post_id', dependent: :destroy, inverse_of: 'post'
    has_many :notifications, inverse_of: 'notifiable', foreign_key: 'notifiable_id', dependent: :destroy
    has_many :labelings, foreign_key: :guild_post_id, inverse_of: :guild_post, dependent: :destroy
    has_many :labels, through: :labelings

    scope :labeled_with, ->(labels) { includes(:labelings).where(labelings: {labels: labels}) }

    scope :feed, lambda { |specialist|
      published.
        or(removed.where(specialist: specialist)).
        includes(:specialist).
        order(pinned: :desc, created_at: :desc)
    }

    scope :popular, lambda {
      published.
        includes(:specialist).
        where(created_at: 2.weeks.ago..Time.current, resolved_at: nil, pinned: false).
        select("guild_posts.*, reactionable_count + engagements_count AS rank").
        order("rank DESC").
        limit(3)
    }

    enum status: {draft: 0, published: 1, removed: 2}

    validates :type, :status, presence: true
    validates :title, length: {maximum: 250, minimum: 8}, allow_nil: true
    validates :body, length: {maximum: 10_000, minimum: 16}, allow_nil: true
    validates :audience_type, inclusion: {in: AUDIENCE_TYPES}, allow_nil: true
    jsonb_accessor :data, audience_type: [:string]

    before_validation :set_default_values
    before_save :reset_guild_topics, if: :guild_topics_resettable?
    before_save :reset_previous_pinned, if: :pinned_changed?

    # General, Opportunity, Advice Required, Case Study
    def normalized_type
      case type
      when 'Post'
        'General'
      else
        type.demodulize.titleize
      end
    end

    def cover_image
      images.find_by(cover: true)
    end

    def excerpt
      body&.truncate(300)
    end

    def boost!
      raise BoostError, "Post is already boosted" if boosted_at.present?
      raise BoostError, "Cannot boost unpublished post" unless published?
      raise BoostError, "Cannot boost a post with zero topics" if guild_topics.empty?

      update(boosted_at: Time.current)
      GuildPostBoostedJob.perform_later(id)
    end

    protected

    def guild_topics_resettable?
      audience_type_changed? && guild_topic_list.any?
    end

    def reset_guild_topics
      return unless guild_topics_resettable?

      self.guild_topics = []
    end

    def reset_previous_pinned
      return unless pinned

      Guild::Post.where(pinned: true).find_each { |post| post.update(pinned: false) }
    end

    private

    def set_default_values
      self.status = 'draft' if status.blank?
    end

    # As per instructions in https://github.com/mbleigh/acts-as-taggable-on/blob/master/lib/acts_as_taggable_on/taggable/core.rb#L300-L321
    def find_or_create_tags_from_list_with_context(tag_list, _)
      Guild::Topic.find_or_create_all_with_like_by_name(tag_list)
    end
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                 :uuid             not null, primary key
#  body               :text
#  boosted_at         :datetime
#  comments_count     :integer          default(0), not null
#  data               :jsonb            not null
#  engagements_count  :integer          default(0)
#  pinned             :boolean          default(FALSE)
#  reactionable_count :integer          default(0), not null
#  resolved_at        :datetime
#  shareable          :boolean          default(FALSE)
#  status             :integer          default("draft"), not null
#  title              :string
#  type               :string           default("Post"), not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  specialist_id      :bigint
#
# Indexes
#
#  index_guild_posts_on_data           (data) USING gin
#  index_guild_posts_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#
