class Types::ConsultationType < Types::BaseType
  field :id, ID, null: false

  def id
    object.uid
  end
end
