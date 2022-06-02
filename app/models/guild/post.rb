# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    class BoostError < StandardError; end

    self.store_full_sti_class = false

    AUDIENCE_TYPES = %w[skills industries locations none other].freeze
    POPULAR_THRESHOLD = 5

    belongs_to :specialist
    belongs_to :article, optional: true, class_name: "::CaseStudy::Article"
    has_one :account, through: :specialist
    has_many :images, class_name: "Guild::PostImage", foreign_key: "guild_post_id", inverse_of: "post", dependent: :destroy
    has_many :engagements, class_name: "Guild::PostEngagement", foreign_key: "guild_post_id", dependent: :destroy, inverse_of: "post"
    has_many :notifications, foreign_key: "guild_post_id", dependent: :destroy, inverse_of: "guild_post"
    has_many :labelings, foreign_key: :guild_post_id, inverse_of: :guild_post, dependent: :destroy
    has_many :labels, through: :labelings
    has_many :messages, foreign_key: :guild_post_id, inverse_of: :guild_post, dependent: :nullify

    scope :unresolved, -> { where(resolved_at: nil) }
    scope :labeled_with, ->(labels) { includes(:labelings).where(labelings: {labels:}) }

    scope :feed, lambda { |specialist|
      published.
        or(removed.where(specialist:)).
        includes(:specialist).
        order(pinned: :desc, created_at: :desc)
    }

    enum status: {draft: 0, published: 1, removed: 2}

    validates :title, length: {maximum: 250, minimum: 8}, allow_nil: true
    validates :body, length: {maximum: 10_000, minimum: 16}, allow_nil: true
    validates :audience_type, inclusion: {in: AUDIENCE_TYPES}, allow_nil: true

    before_validation :set_default_values
    before_save :reset_labels, if: :labels_resettable?
    before_save :reset_previous_pinned, if: :pinned_changed?

    def cover_image
      images.find_by(cover: true)
    end

    def excerpt
      body&.truncate(300)
    end

    def boost!
      raise BoostError, "Post is already boosted" if boosted_at.present?
      raise BoostError, "Cannot boost unpublished post" unless published?
      raise BoostError, "Cannot boost a post with zero labels" if labels.empty?

      update(boosted_at: Time.current)
      GuildPostBoostedJob.perform_later(id)
    end

    protected

    def labels_resettable?
      audience_type_was.present? && audience_type_changed? && labels.any?
    end

    def reset_labels
      return unless labels_resettable?

      self.labels = []
    end

    def reset_previous_pinned
      return unless pinned

      Guild::Post.where(pinned: true).find_each { |post| post.update(pinned: false) }
    end

    private

    def set_default_values
      self.status = "draft" if status.blank?
    end
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                :uuid             not null, primary key
#  audience_type     :string
#  body              :text
#  boosted_at        :datetime
#  engagements_count :integer          default(0)
#  pinned            :boolean          default(FALSE)
#  resolved_at       :datetime
#  shareable         :boolean          default(FALSE)
#  status            :integer          default("draft"), not null
#  title             :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  article_id        :bigint
#  specialist_id     :bigint
#
# Indexes
#
#  index_guild_posts_on_article_id     (article_id)
#  index_guild_posts_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
