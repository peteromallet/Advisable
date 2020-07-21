class Mutations::UpdateProject < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :goals, [String], required: false
  argument :primary_skill, String, required: false
  argument :skills, [String], required: false
  argument :description, String, required: false
  argument :service_type, String, required: false
  argument :company_description, String, required: false
  argument :specialist_description, String, required: false
  argument :questions, [String], required: false
  # Set the characteristics for the project.
  argument :characteristics, [String], required: false
  # Set the list of required characteristics for the project.
  argument :required_characteristics, [String], required: false
  argument :accepted_terms, Boolean, required: false
  # Set how important industry experience is for the project. This was
  # introduced after the industry_experience_required and company_type_required
  # columns. These have been deprecated in favour of this column.
  argument :industry_experience_importance, Int, required: false
  # Sets how important location is for the project
  argument :location_importance, Int, required: false
  argument :likely_to_hire, Int, required: false

  field :project, Types::ProjectType, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    project = Project.find_by_uid_or_airtable_id!(args[:id])
    project.assign_attributes(assign_attributes(args))
    update_skills(project, args)
    project.save

    { project: project }
  end

  private

  def assign_attributes(**args)
    args.slice(
      :goals,
      :primary_skill,
      :description,
      :service_type,
      :company_description,
      :specialist_description,
      :questions,
      :characteristics,
      :required_characteristics,
      :accepted_terms,
      :likely_to_hire,
      :location_importance,
      :industry_experience_importance
    )
  end

  def update_skills(project, args)
    return unless args[:skills].present?
    skills = Skill.where(name: args[:skills])
    project.skills = skills

    if args[:primary_skill]
      primary_skill = Skill.find_by_name(args[:primary_skill])
      project.project_skills.where(primary: true).update(primary: false)
      project.project_skills.find_or_create_by(skill: primary_skill).update(
        primary: true
      )
    end
  end
end
