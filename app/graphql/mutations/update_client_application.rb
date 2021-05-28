# frozen_string_literal: true

module Mutations
  class UpdateClientApplication < Mutations::BaseMutation
    description "Updates the users information during signup"

    argument :budget, Int, required: false
    argument :business_type, String, required: false
    argument :company_name, String, required: false
    argument :company_type, String, required: false
    argument :feedback, Boolean, required: false
    argument :goals, [String], required: false
    argument :industry, String, required: false
    argument :marketing_attitude, String, required: false
    argument :title, String, required: false

    field :client_application, Types::ClientApplicationType, null: true

    ALLOWED_STATUSES = ["Application Started", "Submitted"].freeze

    def authorized?(*_)
      requires_current_user!
      ApiError.invalid_request("INVALID_STATUS", "Wrong application status") unless ALLOWED_STATUSES.include?(current_user.application_status)
      true
    end

    def resolve(**args)
      current_user.title = args[:title] if args.key?(:title)
      company = current_user.company
      company.name = args[:company_name] if args.key?(:company_name)
      company.industry = Industry.find_by_name!(args[:industry]) if args.key?(:industry)
      company.kind = args[:company_type] if args.key?(:company_type)
      company.assign_attributes(
        args.slice(
          :budget,
          :business_type,
          :goals,
          :feedback,
          :marketing_attitude,
        )
      )
      success = current_account_responsible_for do
        current_user.save && company.save
      end

      if success
        current_user.sync_to_airtable
        {client_application: current_user}
      else
        ApiError.invalid_request('FAILED_TO_SAVE', company.errors.full_messages.first)
      end
    end
  end
end
