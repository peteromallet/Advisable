# frozen_string_literal: true

class Label < ApplicationRecord
  include Sluggable

  slug_from :name

  belongs_to :country, optional: true
  belongs_to :industry, optional: true
  belongs_to :skill, optional: true
  has_many :post_prompts, dependent: :destroy
  has_many :subscriptions, dependent: :destroy
  has_many :labelings, dependent: :destroy
  has_many :guild_posts, through: :labelings

  scope :most_used, ->(limit = 20) { order(labelings_count: :desc).limit(limit) }
  scope :published, -> { where.not(published_at: nil) }
  scope :on_country, -> { where.not(country_id: nil) }
  scope :on_industry, -> { where.not(industry_id: nil) }
  scope :on_skill, -> { where.not(skill_id: nil) }
  scope :other, -> { published.where(country_id: nil, industry_id: nil, skill_id: nil).order(labelings_count: :desc) }

  validates :country, :industry, :skill, uniqueness: true, allow_blank: true

  def publish!(time = nil)
    update(published_at: time.presence || Time.zone.now)
  end
end

# == Schema Information
#
# Table name: labels
#
#  id              :uuid             not null, primary key
#  description     :text
#  labelings_count :integer
#  name            :string
#  published_at    :datetime
#  slug            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  country_id      :bigint
#  industry_id     :bigint
#  skill_id        :bigint
#
# Indexes
#
#  index_labels_on_country_id   (country_id) UNIQUE
#  index_labels_on_industry_id  (industry_id) UNIQUE
#  index_labels_on_skill_id     (skill_id) UNIQUE
#  index_labels_on_slug         (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (industry_id => industries.id)
#  fk_rails_...  (skill_id => skills.id)
#
