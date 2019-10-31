# The SpecialistSkill type represents a specialists association with a skill.
# Its important to note that the underlying object is not a SpecialistSkill
# record as a specialist can have skills from multiple places. The 'object'
# variable is an OpenStruct with the specialist and skill record. See the
# resolver for the specialist skills field.
class Types::SpecialistSkillType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :verified, Boolean, null: false

  def id
    object.skill.uid
  end

  def name
    object.skill.name
  end

  def verified
    specialist.project_skills.include?(skill) || 
    specialist.off_platform_project_skills.include?(skill)
  end

  def skill
    object.skill
  end

  def specialist
    object.specialist
  end
end