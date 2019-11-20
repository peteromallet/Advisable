require "administrate/base_dashboard"

class UserDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    airtable_id: Field::String,
    first_name: Field::String,
    last_name: Field::String,
    email: Field::String,
    country: Field::BelongsTo,
    projects: Field::HasMany,
    bank_transfers_enabled: Field::Boolean,
    permissions: PermissionsField,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :first_name,
    :last_name,
    :email,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :id,
    :airtable_id,
    :first_name,
    :last_name,
    :email,
    :country,
    :bank_transfers_enabled,
    :permissions,
    :projects,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :first_name,
    :last_name,
    :email,
    :country,
    :permissions,
    :bank_transfers_enabled
  ].freeze

  # Overwrite this method to customize how clients are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(client)
    client.name
  end
end
