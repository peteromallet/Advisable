require 'administrate/base_dashboard'

class ProjectDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    applications: Field::HasMany,
    id: Field::Number,
    uid: Field::String,
    name: Field::String,
    sourcing: Field::Boolean,
    status: Field::String,
    description: Field::Text,
    goals: TextArrayField,
    primary_skill: Field::HasOne.with_options(class_name: Skill),
    questions: TextArrayField,
    required_characteristics: TextArrayField,
    characteristics: TextArrayField,
    company_description: Field::Text,
    specialist_description: Field::Text,
    deposit: Field::Number,
    client: Field::BelongsTo,
    airtable_id: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[uid primary_skill].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    name
    status
    deposit
    sourcing
    description
    specialist_description
    company_description
    airtable_id
    created_at
    updated_at
    applications
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    name
    status
    sourcing
    description
    goals
    required_characteristics
    characteristics
    deposit
  ].freeze

  # Overwrite this method to customize how projects are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(project)
    project.name || project.primary_skill&.name
  end
end
