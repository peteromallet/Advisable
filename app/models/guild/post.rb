# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    class BoostError < StandardError; end
    include Resizable

    self.store_full_sti_class = false

    POST_TYPES = %w[Post AdviceRequired CaseStudy Opportunity].freeze
    AUDIENCE_TYPES = %w[skills industries locations none other].freeze
    POPULAR_THRESHOLD = 5

    has_many_attached :images
    resize_many images: {resize_to_limit: [1600, 1600]}

    belongs_to :specialist
    belongs_to :post_prompt, optional: true, counter_cache: :guild_posts_count
    has_one :account, through: :specialist
    has_many :reactions, as: :reactionable, dependent: :destroy
    has_many :comments, -> { published }, foreign_key: 'guild_post_id', class_name: 'Guild::Comment', inverse_of: 'post'
    has_many :parent_comments, -> { where(parent_comment_id: nil).published }, class_name: 'Guild::Comment', foreign_key: 'guild_post_id', inverse_of: 'post'
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

    before_validation :set_default_values
    before_save :reset_labels, if: :labels_resettable?
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
      images.find_by(id: cover_photo_id).presence || images.order(:position).first
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

    def popular?
      reactionable_count >= Guild::Post::POPULAR_THRESHOLD && !resolved_at && !pinned
    end

    protected

    def labels_resettable?
      audience_type_was.present? && audience_type_changed? && labels.any?
    end

    def reset_labels
      return unless labels_resettable?

      self.labels = Array(post_prompt ? post_prompt.label : nil)
    end

    def reset_previous_pinned
      return unless pinned

      Guild::Post.where(pinned: true).find_each { |post| post.update(pinned: false) }
    end

    private

    def set_default_values
      self.status = 'draft' if status.blank?
    end
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                 :uuid             not null, primary key
#  audience_type      :string
#  body               :text
#  boosted_at         :datetime
#  comments_count     :integer          default(0), not null
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
#  cover_photo_id     :bigint
#  post_prompt_id     :uuid
#  specialist_id      :bigint
#
# Indexes
#
#  index_guild_posts_on_cover_photo_id  (cover_photo_id)
#  index_guild_posts_on_post_prompt_id  (post_prompt_id)
#  index_guild_posts_on_specialist_id   (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (cover_photo_id => active_storage_attachments.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
