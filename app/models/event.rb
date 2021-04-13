# frozen_string_literal: true

class Event < ApplicationRecord
  include Uid
  include Resizable

  COLORS = %w[blue purple cyan orange].freeze

  has_many :event_attendees, inverse_of: :event, dependent: :destroy
  has_many :attendees, through: :event_attendees
  belongs_to :host, class_name: 'Specialist'

  has_one_attached :cover_photo
  resize cover_photo: {resize_to_limit: [1600, 1600]}

  validates :starts_at, :ends_at, :title, :description, :color, presence: true
  validates :title, length: {maximum: 250, minimum: 8}
  validates :description, length: {maximum: 10_000, minimum: 16}
  validates :color, inclusion: {in: COLORS}

  validate :end_is_after_start

  before_validation :set_color, on: :create
  before_save :reset_previous_featured, if: :featured_changed?

  scope :published, -> { where.not(published_at: nil) }
  scope :featured, -> { where(featured: true) }
  scope :upcoming, lambda {
    published.where(ends_at: (Time.zone.now..)).order(featured: :desc, starts_at: :asc)
  }

  private

  def set_color
    return if color.present?

    self.color = COLORS.sample
  end

  def end_is_after_start
    errors.add(:ends_at, "must be after starts_at") if starts_at >= ends_at
  end

  def reset_previous_featured
    return unless featured

    # rubocop:disable Rails/SkipsModelValidations
    Event.featured.update_all(featured: false)
    # rubocop:enable Rails/SkipsModelValidations
  end
end

# == Schema Information
#
# Table name: events
#
#  id              :bigint           not null, primary key
#  attendees_count :integer          default(0)
#  color           :string           not null
#  description     :text             not null
#  ends_at         :datetime
#  featured        :boolean          default(FALSE)
#  published_at    :datetime
#  starts_at       :datetime
#  title           :string           not null
#  uid             :string           not null
#  url             :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  host_id         :bigint
#
# Indexes
#
#  index_events_on_host_id  (host_id)
#
# Foreign Keys
#
#  fk_rails_...  (host_id => specialists.id)
#
