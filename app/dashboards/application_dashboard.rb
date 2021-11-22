# frozen_string_literal: true

require "administrate/base_dashboard"

class ApplicationDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    uid: Field::String,
    specialist: SimpleBelongsToField,
    project: Field::BelongsTo,
    id: Field::Number,
    invoice_rate: Field::Number,
    availability: Field::String,
    status: Field::String,
    score: Field::Number,
    introduction: Field::Text,
    questions: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    project
    specialist
    status
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    specialist
    project
    id
    invoice_rate
    score
    availability
    status
    introduction
    questions
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    invoice_rate
    score
    availability
    status
    introduction
  ].freeze

  # Overwrite this method to customize how applications are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(application)
  #   "Application ##{application.id}"
  # end

  def collection_includes
    super + [specialist: :account]
  end
end
