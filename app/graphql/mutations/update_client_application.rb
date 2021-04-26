# frozen_string_literal: true

module Mutations
  class UpdateClientApplication < Mutations::BaseMutation
    description "Updates the users information during signup"

    # rubocop:disable GraphQL/ExtractInputType
    argument :budget, Int, required: false
    argument :business_type, String, required: false
    argument :company_name, String, required: false
    argument :company_type, String, required: false
    argument :feedback, Boolean, required: false
    argument :goals, [String], required: false
    argument :industry, String, required: false
    argument :marketing_attitude, String, required: false
    # rubocop:enable GraphQL/ExtractInputType

    field :client_application, Types::ClientApplicationType, null: true

    def authorized?(*_)
      requires_current_user!
      ApiError.invalid_request("INVALID_STATUS", "Not started") if current_user.application_status != "Application Started"
      true
    end

    def resolve(**args)
      update_company_details(current_user.company, args)
      # TODO: Move budget to company
      current_user.budget = args[:budget] if args.key?(:budget)
      current_user.save_and_sync!

      {client_application: current_user}
    end

    private

    def update_company_details(company, args)
      company.name = args[:company_name] if args.key?(:company_name)
      company.business_type = args[:business_type] if args.key?(:business_type)
      company.kind = args[:company_type] if args.key?(:company_type)
      company.goals = args[:goals] if args.key?(:goals)
      company.feedback = args[:feedback] if args.key?(:feedback)
      company.marketing_attitude = args[:marketing_attitude] if args.key?(:marketing_attitude)
      company.industry = Industry.find_by_name!(args[:industry]) if args.key?(:industry)
      company.save!
    end
  end
end
