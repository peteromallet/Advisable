class Types::SearchType < Types::BaseType
  field :id, ID, null: false
  field :skill, Types::Skill, null: true
  field :industry, Types::IndustryType, null: true
  field :description, String, null: true
  field :results,
        Types::SpecialistType::ConnectionType,
        max_page_size: 25, null: false
  field :recommendation, Types::PreviousProject, null: true

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
    object.recommended_project
  end
end
