class Types::IndustryType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false

  def id
    object.uid
  end
end
