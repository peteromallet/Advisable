# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    class BoostError < StandardError; end
    self.ignored_columns += %i[post_prompt_id]

    self.store_full_sti_class = false

    POST_TYPES = %w[Post AdviceRequired CaseStudy Opportunity].freeze
    AUDIENCE_TYPES = %w[skills industries locations none other].freeze
    POPULAR_THRESHOLD = 5

    belongs_to :specialist
    belongs_to :article, optional: true, class_name: "::CaseStudy::Article"
    has_one :account, through: :specialist
    has_many :images, class_name: "Guild::PostImage", foreign_key: "guild_post_id", inverse_of: "post", dependent: :destroy
    has_many :engagements, class_name: "Guild::PostEngagement", foreign_key: "guild_post_id", dependent: :destroy, inverse_of: "post"
    has_many :notifications, inverse_of: "notifiable", foreign_key: "notifiable_id", dependent: :destroy
    has_many :labelings, foreign_key: :guild_post_id, inverse_of: :guild_post, dependent: :destroy
    has_many :labels, through: :labelings
    has_many :messages, foreign_key: :guild_post_id, inverse_of: :guild_post, dependent: :nullify

    scope :unresolved, -> { where(resolved_at: nil) }
    scope :labeled_with, ->(labels) { includes(:labelings).where(labelings: {labels: labels}) }

    scope :feed, lambda { |specialist|
      published.
        or(removed.where(specialist: specialist)).
        includes(:specialist).
        order(pinned: :desc, created_at: :desc)
    }

    enum status: {draft: 0, published: 1, removed: 2}

    validates :type, :status, presence: true
    validates :title, length: {maximum: 250, minimum: 8}, allow_nil: true
    validates :body, length: {maximum: 10_000, minimum: 16}, allow_nil: true
    validates :audience_type, inclusion: {in: AUDIENCE_TYPES}, allow_nil: true

    before_validation :set_default_values
    before_save :reset_labels, if: :labels_resettable?
    before_save :reset_previous_pinned, if: :pinned_changed?

    # General, Opportunity, Advice Required, Case Study
    def normalized_type
      case type
      when "Post"
        "General"
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
#  type              :string           default("Post"), not null
#  body              :text
#  title             :string
#  status            :integer          default("0"), not null
#  specialist_id     :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  engagements_count :integer          default("0")
#  shareable         :boolean          default("false")
#  pinned            :boolean          default("false")
#  boosted_at        :datetime
#  resolved_at       :datetime
#  audience_type     :string
#  article_id        :integer
#
# Indexes
#
#  index_guild_posts_on_article_id      (article_id)
#  index_guild_posts_on_post_prompt_id  (post_prompt_id)
#  index_guild_posts_on_specialist_id   (specialist_id)
#
