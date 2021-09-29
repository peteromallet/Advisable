# frozen_string_literal: true

module Applications
  class Update < ApplicationService
    attr_reader :application, :attributes, :current_account_id

    def initialize(id:, attributes:, current_account_id: nil)
      super()
      @application = Application.find_by_uid_or_airtable_id!(id)
      @attributes = attributes
      @current_account_id = current_account_id
    end

    def call
      application.assign_attributes(permitted_attributes)
      apply_question_answers
      create_references
      success = Logidze.with_responsible(current_account_id) do
        application.save
      end
      application.sync_to_airtable if success
      application
    end

    private

    def permitted_attributes
      attributes.slice(
        :introduction,
        :availability,
        :invoice_rate,
        :accepts_fee,
        :accepts_terms,
        :project_type,
        :monthly_limit,
        :trial_program,
        :auto_apply
      )
    end

    def specialist
      @specialist ||= application.specialist
    end

    # Iterate through the supplied questions assigning each answer based off
    # of the question.
    def apply_question_answers
      return unless attributes[:questions]

      application_questions = application.questions || []
      # iterate through the passed questions. This should be an array of hashes
      # with 'question' and 'answer' keys.
      attributes[:questions].each do |hash|
        unless (
                 # Check that the passed quesion is in the projects questions array.
                 application.project.questions || []
               ).include?(hash[:question])
          raise Service::Error, :invalid_question
        end

        # Check if the question has already been answered
        index =
          application_questions.find_index do |q|
            q["question"] == hash[:question]
          end

        # Override the answer if it has already been answered
        if index.present?
          application_questions[index] = hash
        else
          # If it hasnt already been answered then add it to the application
          # questions array
          application_questions.push(hash)
        end
      end

      application.questions = application_questions
    end

    def reference_projects
      @reference_projects ||=
        attributes[:references].map do |id|
          project = specialist.previous_projects.find_by(uid: id)
          raise Service::Error, :invalid_reference if project.blank?

          project
        end
    end

    # iterate through the attributes[:references] array and create relationships
    # for each id.
    def create_references
      return unless attributes[:references]

      reference_projects.each do |project|
        application.application_references.find_or_create_by(previous_project: project)
      end

      application.application_references.where.not(previous_project: reference_projects).delete_all
    end
  end
end

module Mutations
  class UpdateApplication < Mutations::BaseMutation
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
