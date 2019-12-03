class Types::ConsultationType < Types::BaseType
  field :id, ID, null: false
  field :status, String, null: true
  field :topic, String, null: true
  field :user, Types::User, null: false
  field :specialist, Types::SpecialistType, null: false
  field :interview, Types::Interview, null: true

  def id
    object.uid
  end
end
