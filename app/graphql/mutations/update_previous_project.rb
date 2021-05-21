# frozen_string_literal: true

module Mutations
  class UpdatePreviousProject < Mutations::BaseMutation
    ALLOWED_ARGS_WHEN_PUBLISHED = %i[previous_project description contact_name contact_job_title contact_relationship].freeze

    argument :client_name, String, required: false
    argument :company_type, String, required: false
    argument :confidential, Boolean, required: false
    argument :contact_job_title, String, required: false
    argument :contact_name, String, required: false
    argument :contact_relationship, String, required: false
    argument :cost_to_hire, Integer, required: false
    argument :description, String, required: false
    argument :execution_cost, Integer, required: false
    argument :goal, String, required: false
    argument :industries, [String], required: false
    argument :industry_relevance, Integer, required: false
    argument :location_relevance, Integer, required: false
    argument :previous_project, ID, required: true
    argument :primary_industry, String, required: false
    argument :primary_skill, String, required: false
    argument :public_use, Boolean, required: false
    argument :skills, [String], required: false

    field :previous_project, Types::PreviousProject, null: true

    def authorized?(previous_project:, **args)
      requires_specialist!
      project = PreviousProject.find_by_uid(previous_project)

      policy = PreviousProjectPolicy.new(current_user, project)
      return unless policy.update?

      ApiError.invalid_request("PROJECT_PUBLISHED", "Can not save changes because the project has been published") if project.draft == false && (args.keys - ALLOWED_ARGS_WHEN_PUBLISHED).any?
      ApiError.invalid_request("PROJECT_VALIDATED", "Project has already been validated") if project.validation_status == "Validated"

      true
    end

    def resolve(**args)
      project = PreviousProject.find_by_uid(args[:previous_project])
      project.assign_attributes(assignable_attrs(args))
      update_description(project, args)
      update_skills(project, args)
      update_industries(project, args)
      update_contact_details(project, args)
      current_account_responsible_for { project.save }
      {previous_project: project}
    end

    private

    def assignable_attrs(args)
      args.slice(
        :confidential,
        :client_name,
        :company_type,
        :goal,
        :public_use,
        :industry_relevance,
        :location_relevance,
        :cost_to_hire,
        :execution_cost
      )
    end

    def update_description(project, args)
      return if args[:description].blank?

      project.description = args[:description]
    end

    def update_skills(project, args)
      return if args[:skills].blank?

      skills = Skill.where(name: args[:skills])
      project.skills = skills

      return unless args[:primary_skill]

      primary_skill = Skill.find_by_name(args[:primary_skill])
      project.primary_project_skill.try(:update, primary: false)
      project.project_skills.find_or_create_by(skill: primary_skill).update(
        primary: true
      )
    end

    def update_industries(project, args)
      return if args[:industries].blank?

      industries = Industry.where(name: args[:industries])
      project.industries = industries

      return unless args[:primary_industry]

      primary_industry = Industry.find_by_name(args[:primary_industry])
      project.project_industries.where(primary: true).update_all(primary: false) # rubocop:disable Rails/SkipsModelValidations
      project.project_industries.find_or_create_by(industry: primary_industry).update(primary: true)
    end

    def update_contact_details(project, args)
      return if args[:contact_name].blank? || args[:contact_job_title].blank? || args[:contact_relationship].blank?

      project.contact_name = args[:contact_name] if args.key?(:contact_name)
      project.contact_job_title = args[:contact_job_title] if args.key?(:contact_job_title)
      project.contact_relationship = args[:contact_relationship] if args.key?(:contact_relationship)
    end
  end
end
