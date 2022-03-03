# frozen_string_literal: true

module Mutations
  class UpdateApplication < Mutations::BaseMutation
    PERMITTED_ATTRIBUTES = %i[introduction availability invoice_rate accepts_fee accepts_terms project_type monthly_limit trial_program auto_apply].freeze

    description "Used to update an application record during the application process"

    argument :accepts_fee, Boolean, required: false
    argument :accepts_terms, Boolean, required: false
    argument :auto_apply, Boolean, required: false
    argument :availability, String, required: false
    argument :id, ID, required: true
    argument :introduction, String, required: false
    argument :invoice_rate, Int, required: false
    argument :monthly_limit, Int, required: false
    argument :persist_bio, Boolean, required: false
    argument :project_type, String, required: false
    argument :references, [ID], required: false
    argument :trial_program, Boolean, required: false

    field :application, Types::ApplicationType, null: true

    def authorized?(id:, **_args)
      requires_specialist!

      application = Application.find_by!(uid: id)
      return true if current_user == application.specialist

      ApiError.invalid_request("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(id:, **args)
      application = Application.find_by!(uid: id)
      application.assign_attributes(args.slice(*PERMITTED_ATTRIBUTES))
      save_with_current_account!(application)
      application.specialist.update(bio: args[:introduction]) if args[:persist_bio] && args[:introduction].present?

      {application:}
    end
  end
end
