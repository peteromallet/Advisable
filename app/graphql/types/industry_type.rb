class Types::IndustryType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :color, String, null: false
  field :popular_skills, Types::Skill.connection_type, null: false

  def id
    object.uid
  end

  def popular_skills
    object.skills.popular
  end
end
