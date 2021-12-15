# frozen_string_literal: true

class Label < ApplicationRecord
  include Sluggable

  slug_from :name

  belongs_to :country, optional: true
  belongs_to :industry, optional: true
  belongs_to :skill, optional: true
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
#  name            :string
#  slug            :string
#  published_at    :datetime
#  labelings_count :integer
#  country_id      :integer
#  industry_id     :integer
#  skill_id        :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  description     :text
#
# Indexes
#
#  index_labels_on_country_id   (country_id) UNIQUE
#  index_labels_on_industry_id  (industry_id) UNIQUE
#  index_labels_on_skill_id     (skill_id) UNIQUE
#  index_labels_on_slug         (slug) UNIQUE
#
