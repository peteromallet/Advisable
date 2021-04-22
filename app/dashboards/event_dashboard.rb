# frozen_string_literal: true

require "administrate/base_dashboard"

class EventDashboard < Administrate::BaseDashboard
  DATETIME_OPTIONS = {format: "%d %b at %I:%M%P %Z"}.freeze
  ATTRIBUTE_TYPES = {
    id: Field::String.with_options(searchable: false),
    title: Field::String,
    url: Field::String,
    uid: Field::String,
    host: Field::BelongsTo.with_options(class_name: 'Specialist', scope: -> { Specialist.includes(:account) }),
    starts_at: Field::DateTime.with_options(DATETIME_OPTIONS),
    ends_at: Field::DateTime.with_options(DATETIME_OPTIONS),
    published_at: Field::DateTime.with_options(DATETIME_OPTIONS),
    featured: Field::Boolean,
    cover_photo: Field::ActiveStorage.with_options(direct_upload: true),
    attendees_count: Field::Number,
    attendees: Field::HasMany.with_options(class_name: 'Specialist'),
    created_at: Field::DateTime,
    description: Field::Text
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    title
    starts_at
    ends_at
    attendees_count
    uid
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    id
    title
    description
    starts_at
    ends_at
    host
    attendees_count
    attendees
    cover_photo
    published_at
    url
    uid
    featured
  ].freeze

  FORM_ATTRIBUTES = %i[
    title
    description
    starts_at
    ends_at
    cover_photo
    published_at
    url
    host
    featured
  ].freeze

  COLLECTION_FILTERS = {}.freeze
end
