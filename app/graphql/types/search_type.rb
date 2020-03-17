class Types::SearchType < Types::BaseType
  field :id, ID, null: false
  field :skill, Types::Skill, null: true
  field :industry, Types::IndustryType, null: true
  field :results, Types::SpecialistConnection, max_page_size: 25, null: false
  field :recommendation, Types::ProfileProjectType, null: true

  def id
    object.uid
  end

  def skill
    Skill.find_by_name(object.skill)
  end

  def industry
    Industry.find_by_name(object.industry)
  end

  def recommendation
    return nil unless object.recommended_project.present?
    PreviousProject.new(
      project: object.recommended_project,
      specialist: object.recommended_project.specialist
    )
  end
end
