class Types::Skill < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :category, String, null: false

  def id
    object.uid
  end
end