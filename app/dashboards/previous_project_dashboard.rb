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
    specialist: Field::BelongsTo,
    project_skills: Field::HasMany,
    skills: Field::HasMany,
    primary_skill: Field::HasOne.with_options(class_name: 'Skill'),
    id: Field::Number,
    airtable_id: Field::String,
    industry: Field::String,
    contact_first_name: Field::String,
    contact_last_name: Field::String,
    contact_job_title: Field::String,
    client_name: Field::String,
    client_description: Field::Text,
    description: Field::Text,
    requirements: Field::Text,
    results: Field::Text,
    confidential: Field::Boolean,
    validated: Field::Boolean,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    can_contact: Field::Boolean,
    validation_url: Field::String,
    contact_email: Field::String,
    validation_method: Field::String,
    validation_status: Field::String,
    validated_by_client: Field::Boolean,
    validation_explanation: Field::String,
    company_type: Field::String,
    public_use: Field::Boolean,
    uid: Field::String,
    goal: Field::String,
    contact_relationship: Field::String,
    hide_from_profile: Field::Boolean,
    priority: Field::Number,
    advisable_score: Field::Number,
    draft: Field::Boolean,
    description_requires_update: Field::Boolean,
    industry_relevance: Field::Number,
    location_relevance: Field::Number,
    cost_to_hire: Field::Number,
    execution_cost: Field::Number,
    pending_description: Field::String,
    validation_failed_reason: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[specialist client_name primary_skill].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    specialist
    project_skills
    skills
    primary_skill
    id
    airtable_id
    industry
    contact_first_name
    contact_last_name
    contact_job_title
    client_name
    client_description
    description
    requirements
    results
    confidential
    validated
    created_at
    updated_at
    can_contact
    validation_url
    contact_email
    validation_method
    validation_status
    validated_by_client
    validation_explanation
    company_type
    public_use
    uid
    goal
    contact_relationship
    hide_from_profile
    priority
    advisable_score
    draft
    description_requires_update
    industry_relevance
    location_relevance
    cost_to_hire
    execution_cost
    pending_description
    validation_failed_reason
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    specialist
    project_skills
    skills
    primary_skill
    airtable_id
    industry
    contact_first_name
    contact_last_name
    contact_job_title
    client_name
    client_description
    description
    requirements
    results
    confidential
    validated
    can_contact
    validation_url
    contact_email
    validation_method
    validation_status
    validated_by_client
    validation_explanation
    company_type
    public_use
    uid
    goal
    contact_relationship
    hide_from_profile
    priority
    advisable_score
    draft
    description_requires_update
    industry_relevance
    location_relevance
    cost_to_hire
    execution_cost
    pending_description
    validation_failed_reason
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
