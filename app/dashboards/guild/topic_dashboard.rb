# frozen_string_literal: true

require "administrate/base_dashboard"

module Guild
  class TopicDashboard < Administrate::BaseDashboard
    ATTRIBUTE_TYPES = {
      id: Field::String.with_options(searchable: false),
      name: Field::String,
      slug: Field::String,
      published: Field::Boolean,
      taggings_count: Field::Number,
      created_at: Field::DateTime
    }.freeze

    COLLECTION_ATTRIBUTES = %i[
      name
      published
      taggings_count
      created_at
    ].freeze

    SHOW_PAGE_ATTRIBUTES = %i[
      id
      slug
      name
      published
      taggings_count
      created_at
    ].freeze

    FORM_ATTRIBUTES = %i[
      name
      published
    ].freeze

    COLLECTION_FILTERS = {}.freeze
  end
end
