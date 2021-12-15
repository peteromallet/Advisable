# frozen_string_literal: true

class Event < ApplicationRecord
  include Uid
  include Resizable

  COLORS = %w[blue purple cyan orange].freeze
  STATUSES = %w[Proposed Accepted Rejected].freeze
  has_many :event_attendees, inverse_of: :event, dependent: :destroy
  has_many :attendees, through: :event_attendees
  belongs_to :host, class_name: "Specialist"

  has_one_attached :cover_photo
  resize cover_photo: {resize_to_limit: [1600, 1600]}

  validates :starts_at, :ends_at, :title, :description, :color, presence: true
  validates :title, length: {maximum: 250, minimum: 8}
  validates :description, length: {maximum: 10_000, minimum: 16}
  validates :color, inclusion: {in: COLORS}
  validates :status, inclusion: {in: STATUSES}, allow_blank: true

  validate :end_is_after_start

  before_validation :set_color, on: :create
  before_save :reset_previous_featured, if: :featured_changed?

  scope :published, -> { where.not(published_at: nil) }
  scope :featured, -> { where(featured: true) }
  scope :list, lambda {
    published.order(
      Arel.sql("
        CASE
          WHEN featured = true THEN 0
          ELSE 1
        END, starts_at DESC")
    )
  }
  scope :upcoming, -> { where(ends_at: (Time.zone.now..)) }
  scope :for_graphql, lambda {
                        includes(
                          cover_photo_attachment: {blob: :variant_records},
                          host: :account,
                          attendees: nil
                        )
                      }

  private

  def set_color
    return if color.present?

    self.color = COLORS.sample
  end

  def end_is_after_start
    return unless starts_at.present? && ends_at.present?

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
#  id                 :integer          not null, primary key
#  uid                :string           not null
#  title              :string           not null
#  description        :text             not null
#  url                :string
#  color              :string           not null
#  host_id            :integer
#  featured           :boolean          default("false")
#  published_at       :datetime
#  starts_at          :datetime
#  ends_at            :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  google_calendar_id :string
#  status             :string
#
# Indexes
#
#  index_events_on_host_id  (host_id)
#  index_events_on_uid      (uid) UNIQUE
#
