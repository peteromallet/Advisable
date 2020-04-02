require 'administrate/base_dashboard'

class OffPlatformProjectDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    specialist: Field::BelongsTo,
    reviews: Field::HasMany,
    project_skills: Field::HasMany,
    skills: Field::HasMany,
    primary_project_skill: Field::HasOne,
    project_industries: Field::HasMany,
    industries: Field::HasMany,
    primary_project_industry: Field::HasOne,
    primary_industry: Field::HasOne,
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
    primary_skill: Field::String,
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
    application_id: Field::Number
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[specialist reviews project_skills skills].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    specialist
    reviews
    project_skills
    skills
    primary_project_skill
    primary_skill
    project_industries
    industries
    primary_project_industry
    primary_industry
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
    primary_skill
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
    application_id
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    specialist
    reviews
    project_skills
    skills
    primary_project_skill
    primary_skill
    project_industries
    industries
    primary_project_industry
    primary_industry
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
    primary_skill
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
    application_id
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

  # Overwrite this method to customize how off platform projects are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(off_platform_project)
  #   "OffPlatformProject ##{off_platform_project.id}"
  # end
end
