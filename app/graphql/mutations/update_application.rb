# frozen_string_literal: true

# Used to update an application record during the application process.
module Mutations
  class UpdateApplication < Mutations::BaseMutation
    class ApplicationQuestionInputType < GraphQL::Schema::InputObject
      argument :answer, String, required: true
      argument :question, String, required: true
    end

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
    argument :questions, [ApplicationQuestionInputType], required: false
    argument :references, [ID], required: false
    argument :trial_program, Boolean, required: false

    field :application, Types::ApplicationType, null: true

    def authorized?(id:, **_args)
      requires_specialist!

      application = Application.find_by!(uid: id)
      return true if current_user == application.specialist

      ApiError.invalid_request("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(**args)
      application = Applications::Update.call(id: args[:id], attributes: attributes(args), current_account_id: current_account_id)
      persist_bio(application.specialist, args[:introduction]) if args[:persist_bio]
      {application: application}
    rescue Service::Error => e
      ApiError.service_error(e)
    end

    private

    def persist_bio(specialist, bio)
      return if bio.blank?

      specialist.update(bio: bio)
    end

    def attributes(args)
      questions = (args[:questions] || []).map { |qa| {question: qa.question, answer: qa.answer} }
      args.except(:id, :questions).merge({questions: questions})
    end
  end
end
