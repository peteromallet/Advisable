class Types::CountryType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: true
  field :currency, String, null: true

  def id
    object.uid
  end
end
