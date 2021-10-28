# frozen_string_literal: true

require "administrate/base_dashboard"

class PreviousProjectDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    account: Field::HasOne.with_options(
      searchable: true,
      searchable_fields: %w[first_name last_name email]
    ),
    specialist: Field::BelongsTo,
    project_skills: Field::HasMany,
    primary_skill: Field::HasOne.with_options(class_name: "Skill"),
    id: Field::Number,
    contact_first_name: Field::String,
    contact_last_name: Field::String,
    contact_job_title: Field::String,
    client_name: Field::String,
    client_description: Field::Text,
    description: Field::Text,
    confidential: Field::Boolean,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    validation_status: Field::String,
    company_type: Field::String,
    public_use: Field::Boolean,
    uid: Field::String,
    goal: Field::String,
    hide_from_profile: Field::Boolean,
    draft: Field::Boolean,
    industry_relevance: Field::Number,
    location_relevance: Field::Number,
    cost_to_hire: Field::Number,
    execution_cost: Field::Number,
    validation_failed_reason: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[specialist primary_skill client_name].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    uid
    specialist
    primary_skill
    project_skills
    description
    goal
    contact_first_name
    contact_last_name
    contact_job_title
    client_name
    confidential
    created_at
    updated_at
    validation_status
    company_type
    public_use
    draft
    industry_relevance
    location_relevance
    cost_to_hire
    execution_cost
    validation_failed_reason
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    client_name
    description
    goal
    contact_first_name
    contact_last_name
    contact_job_title
    confidential
    validation_status
    company_type
    public_use
    hide_from_profile
    draft
    industry_relevance
    location_relevance
    cost_to_hire
    execution_cost
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how previous projects are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(previous_project)
  #   "PreviousProject ##{previous_project.id}"
  # end
end
