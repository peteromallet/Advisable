class Applications::Update < ApplicationService
  attr_reader :application, :attributes

  def initialize(id:, attributes:)
    @application = Application.find_by_uid_or_airtable_id!(id)
    @attributes = attributes
  rescue ActiveRecord::RecordNotFound => e
    raise Service::Error.new(:record_not_found)
  end

  def call
    application.assign_attributes(permitted_attributes)
    apply_question_answers
    create_references
    application.sync_to_airtable if application.save
    application
  end

  private

  def permitted_attributes
    attributes.slice(
      :introduction,
      :availability,
      :rate,
      :accepts_fee,
      :accepts_terms,
      :project_type,
      :monthly_limit,
      :trial_program,
      :billing_cycle
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
               application.project.questions ||
                 []
             )
               .include?(hash[:question])
        raise Service::Error.new(:invalid_question)
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
          project = specialist.projects.find_by_airtable_id(id)
          if project.blank?
            project = specialist.off_platform_projects.find_by_airtable_id(id)
          end
          raise Service::Error.new(:invalid_reference) if project.blank?
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
