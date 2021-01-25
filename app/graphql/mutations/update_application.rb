# frozen_string_literal: true

# Used to update an application record during the application process.
class Mutations::UpdateApplication < Mutations::BaseMutation
  class ApplicationQuestionInputType < GraphQL::Schema::InputObject
    argument :question, String, required: true
    argument :answer, String, required: true
  end

  argument :id, ID, required: true
  argument :introduction, String, required: false
  argument :availability, String, required: false
  argument :questions, [ApplicationQuestionInputType], required: false
  argument :references, [ID], required: false
  argument :rate, Float, required: false
  argument :accepts_fee, Boolean, required: false
  argument :accepts_terms, Boolean, required: false
  argument :project_type, String, required: false
  argument :monthly_limit, Int, required: false
  argument :trial_program, Boolean, required: false
  argument :auto_apply, Boolean, required: false
  argument :persist_bio, Boolean, required: false

  field :application, Types::ApplicationType, null: true

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
