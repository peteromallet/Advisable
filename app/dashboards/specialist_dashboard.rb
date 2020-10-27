require 'administrate/base_dashboard'

class SpecialistDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    country: Field::BelongsTo,
    skills: Field::HasMany,
    id: Field::Number,
    account: Field::BelongsTo.with_options(
      searchable: true,
      searchable_fields: %w[first_name last_name email]
    ),
    image: Field::String.with_options(searchable: false),
    linkedin: Field::String,
    travel_availability: Field::String,
    city: Field::String,
    guild: Field::Boolean,
    guild_calendly_link: Field::String.with_options(searchable: false),
    airtable_id: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[account airtable_id].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    account
    image
    linkedin
    travel_availability
    city
    country
    guild
    guild_calendly_link
    airtable_id
    created_at
    updated_at
    skills
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    account
    airtable_id
    skills
    linkedin
    travel_availability
    city
    country
    guild
    guild_calendly_link
    airtable_id
  ].freeze

  # Overwrite this method to customize how specialists are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(specialist)
    specialist.account.name
  end
end
