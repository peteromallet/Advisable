# frozen_string_literal: true

module Guild
  class Post < ApplicationRecord
    self.store_full_sti_class = false

    acts_as_ordered_taggable_on :guild_topics

    POST_TYPES = %w[Post AdviceRequired CaseStudy Opportunity].freeze

    belongs_to :specialist
    has_many :reactions, as: :reactionable
    has_many :comments,
             -> { published },
             foreign_key: 'guild_post_id', class_name: 'Guild::Comment'
    has_many :parent_comments,
             -> { where(parent_comment_id: nil).published },
             class_name: 'Guild::Comment', foreign_key: 'guild_post_id'

    enum status: {draft: 0, published: 1, removed: 2}

    validates :title, :body, :body_raw, :type, :status, presence: true
    validates :title, length: {maximum: 250, minimum: 4}
    validates :body, length: {maximum: 10_000, minimum: 4}

    has_one_attached :cover_image

    before_validation(on: :create) {
      self.status = Post.statuses['published']
    }

    # General, Opportunity, Advice Required, Case Study
    def normalized_type
      case type
      when 'Post'
        'General'
      else
        type.demodulize.titleize
      end
    end
  end
end

# == Schema Information
#
# Table name: guild_posts
#
#  id                 :uuid             not null, primary key
#  audience           :integer          default(0), not null
#  body               :text             not null
#  body_raw           :text             default(""), not null
#  commentable        :boolean          default(TRUE), not null
#  comments_count     :integer          default(0), not null
#  data               :jsonb            not null
#  reactionable       :boolean          default(TRUE), not null
#  reactionable_count :integer          default(0), not null
#  status             :integer          default("draft"), not null
#  title              :string           not null
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
