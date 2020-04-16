class Mutations::UpdatePreviousProject < Mutations::BaseMutation
  argument :previous_project, ID, required: true
  argument :company_name, String, required: false
  argument :confidential, Boolean, required: false
  argument :industries, [String], required: false
  argument :primary_industry, String, required: false
  argument :company_type, String, required: false
  argument :description, String, required: false
  argument :goal, String, required: false
  argument :skills, [String], required: false
  argument :primary_skill, String, required: false
  argument :primary_skill, String, required: false

  field :previous_project, Types::PreviousProject, null: true

  def resolve(**args)
    project = PreviousProject.find_by_uid(args[:previous_project])
    project.assign_attributes(assignable_attrs(args))
    update_skills(project, args)
    project.save
    return { previous_project: project }
  end

  private

  def assignable_attrs(**args)
    args.slice(:confidential, :company_type, :description, :goal)
  end

  def update_skills(project, args)
    return unless args[:skills].present?
    skills = Skill.where(name: args[:skills])
    primary_skill = Skill.find_by_name(args[:primary_skill])
    project.skills = skills
    project.primary_project_skill.try(:update, primary: false)
    project.project_skills.find_or_create_by(skill: primary_skill).update(
      primary: true
    )
  end
end
