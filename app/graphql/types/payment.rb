class Types::Payment < Types::BaseType
  field :id, ID, null: false
  field :status, String, null: false
  field :amount, Int, null: false
  field :project, Types::ProjectType, null: false

  def id
    object.uid
  end
end
