# frozen_string_literal: true

module Mutations
  class UpdateApplication < Mutations::BaseMutation
    PERMITTED_ATTRIBUTES = %i[introduction availability invoice_rate accepts_fee accepts_terms project_type monthly_limit trial_program auto_apply].freeze

    description "Used to update an application record during the application process"

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
      application = Application.find_by!(uid: args[:id])
      attributes = massage_attributes(args)
      application.assign_attributes(attributes.slice(*PERMITTED_ATTRIBUTES))
      add_q_and_a(application, attributes[:questions]) if attributes[:questions].present?
      create_references(application, attributes[:references]) if attributes[:references].present?
      application.save_and_sync_with_responsible!(current_account_id)
      application.specialist.update(bio: args[:introduction]) if args[:persist_bio] && args[:introduction].present?

      {application: application}
    end

    private

    def massage_attributes(args)
      questions = (args[:questions] || []).map { |qa| {question: qa.question, answer: qa.answer} }
      args.except(:id, :questions).merge({questions: questions})
    end

    def add_q_and_a(application, questions)
      application_questions = application.questions || []

      questions.each do |qa|
        ApiError.invalid_request("invalid_question") unless (application.project.questions || []).include?(qa[:question])
        index = application_questions.find_index { |q| q["question"] == qa[:question] }
        if index.present?
          application_questions[index] = qa
        else
          application_questions.push(qa)
        end
      end

      application.questions = application_questions
    end

    def create_references(application, references)
      reference_projects = references.map do |id|
        application.specialist.previous_projects.find_by!(uid: id)
      end

      reference_projects.each do |project|
        application.application_references.find_or_create_by(previous_project: project)
      end

      application.application_references.where.not(previous_project: reference_projects).delete_all
    rescue ActiveRecord::RecordNotFound
      ApiError.invalid_request("invalid_reference")
    end
  end
end
