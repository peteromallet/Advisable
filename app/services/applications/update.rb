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
            q['question'] == hash[:question]
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
        begin
          attributes[:references].map do |id|
            project = specialist.previous_projects.find_by(uid: id)
            raise Service::Error, :invalid_reference if project.blank?

            project
          end
        end
    end

    # iterate through the attributes[:references] array and create relationships
    # for each id.
    def create_references
      return unless attributes[:references]

      reference_projects.each do |project|
        application.references.find_or_create_by(project: project)
      end

      old = application.references.where.not(project: reference_projects)
      old.delete_all
    end
  end
end
