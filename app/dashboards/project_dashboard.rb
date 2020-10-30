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
    status: Field::Select.with_options(collection: Project::STATUSES),
    service_type: Field::Select.with_options(collection: Project::SERVICE_TYPES),
    sales_status: Field::Select.with_options(collection: Project::SALES_STATUSES),
    description: Field::Text,
    goals: TextArrayField,
    questions: TextArrayField.with_options({max: 2}),
    skills: ProjectSkillField,
    user: Field::BelongsTo,
    industry_experience_importance: LabelledSelectField.with_options({collection: Project::INDUSTRY_EXPERIENCE_IMPORTANCE}),
    location_importance: LabelledSelectField.with_options({collection: Project::LOCATION_IMPORTANCE}),
    likely_to_hire: LabelledSelectField.with_options({collection: Project::LIKELY_TO_HIRE}),
    primary_skill: Field::HasOne.with_options(class_name: Skill),
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
    uid
    airtable_id
    status
    sales_status
    user
    primary_skill
    skills
    industry_experience_importance
    location_importance
    likely_to_hire
    characteristics
    required_characteristics
    goals
    questions
    company_description
    description
    specialist_description
    service_type
    deposit
    created_at
    updated_at
    applications
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    status
    sales_status
    service_type
    user
    skills
    industry_experience_importance
    location_importance
    likely_to_hire
    goals
    characteristics
    required_characteristics
    questions
    company_description
    description
    specialist_description
    deposit
  ].freeze

  # Overwrite this method to customize how projects are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(project)
    project.name || project.primary_skill&.name
  end
end
