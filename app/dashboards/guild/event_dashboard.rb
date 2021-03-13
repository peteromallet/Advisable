# frozen_string_literal: true

require "administrate/base_dashboard"

module Guild
  class EventDashboard < Administrate::BaseDashboard
    DATETIME_OPTIONS = {format: "%d %b at %l:%m%P %Z", timezone: "America/Los_Angeles"}.freeze
    ATTRIBUTE_TYPES = {
      id: Field::String.with_options(searchable: false),
      title: Field::String,
      url: Field::String,
      uid: Field::String,
      host: Field::BelongsTo.with_options(class_name: 'Specialist'),
      starts_at: Field::DateTime.with_options(DATETIME_OPTIONS),
      ends_at: Field::DateTime.with_options(DATETIME_OPTIONS),
      published: Field::Boolean,
      cover_photo: Field::ActiveStorage.with_options(direct_upload: true),
      attendees_count: Field::Number,
      attendees: Field::HasMany.with_options(class_name: 'Specialist'),
      created_at: Field::DateTime,
      description: Field::SimpleMarkdown.with_options({
        safe_links_only: true,
        filter_html: true,
        with_toc_data: false,
        hard_wrap: true,
        link_attributes: {rel: 'follow'},
        autolink: true,
        tables: false,
        no_intra_emphasis: true,
        strikethrough: false,
        highlight: false,
        space_after_headers: true,
        easymde_options: {
          placeholder: 'Type here...',
          spell_checker: true,
          hide_icons: %w[guide heading link image]
        }
      })
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
      published
      url
      uid
    ].freeze

    FORM_ATTRIBUTES = %i[
      title
      description
      starts_at
      ends_at
      cover_photo
      published
      url
      host
    ].freeze

    COLLECTION_FILTERS = {}.freeze
  end
end
