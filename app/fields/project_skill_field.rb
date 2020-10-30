require "administrate/field/base"

class ProjectSkillField < Administrate::Field::HasMany
  def selected_skills
    resource.skills.map do |s|
      [s.name, s.id]
    end
  end
end
