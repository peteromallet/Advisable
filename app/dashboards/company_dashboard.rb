# frozen_string_literal: true

require "administrate/base_dashboard"

class CompanyDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    users: Field::HasMany,
    accounts: Field::HasMany.with_options(
      searchable: true,
      searchable_fields: %w[first_name last_name email]
    ),
    projects: Field::HasMany,
    id: Field::String.with_options(searchable: false),
    name: Field::String,
    kind: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    stripe_customer_id: Field::String,
    stripe_setup_intent_id: Field::String,
    setup_intent_status: Field::String,
    payments_setup: Field::Boolean,
    project_payment_method: Field::String,
    accepted_project_payment_terms_at: Field::DateTime,
    invoice_name: Field::String,
    invoice_company_name: Field::String,
    billing_email: Field::String,
    vat_number: Field::String
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    name
    kind
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    name
    users
    projects
    kind
    created_at
    updated_at
    stripe_customer_id
    payments_setup
    project_payment_method
    invoice_name
    invoice_company_name
    billing_email
    vat_number
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    name
    users
    projects
    kind
    created_at
    updated_at
    stripe_customer_id
    payments_setup
    project_payment_method
    invoice_name
    invoice_company_name
    billing_email
    vat_number
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

  # Overwrite this method to customize how companies are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(company)
    company.name
  end
end
