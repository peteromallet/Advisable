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
    update_primary_skill(project, args[:primary_skill])
    project.save_and_sync!

    { project: project }
  end

  private

  def assign_attributes(**args)
    args.slice(
      :goals,
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

    if !args[:primary_skill] && skills.length == 1
      project[:primary_skill] = project.skills.first.name
      project.project_skills.first.update(primary: true)
    end
  end

  def update_primary_skill(project, skill_name)
    return unless skill_name.present?
    primary_skill = Skill.find_by_name(skill_name)
    # TODO:
    # For now we still store the primary skill in a text column. This should
    # be removed in favour of the project_skills association
    project[:primary_skill] = primary_skill.name
    project.project_skills.where(primary: true).update(primary: false)
    project.project_skills.find_or_create_by(skill: primary_skill).update(
      primary: true
    )
  end
end
