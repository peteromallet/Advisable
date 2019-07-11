class Types::CountryType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :states, [String], null: false
  field :eu, Boolean, null: false

  def id
    object.alpha2
  end

  def states
    object.states.map { |code, data| data["name"] }.compact
  end

  def eu
    object.in_eu?
  end
end
