class Types::CountryType < Types::BaseType
  field :id, ID, null: false
  field :code, String, null: true
  field :name, String, null: false
  field :states, [String], null: false
  field :eu, Boolean, null: true
  field :currency, Types::CurrencyType, null: true

  def id
    object.uid
  end

  def code
    object.alpha2
  end

  def currency
    Rails.cache.fetch("#{object.name}_currency") { object.data.try(:currency) }
  end

  def states
    Rails.cache.fetch("#{object.name}_states", expires_in: 7.days) do
      states = object.data.try(:states)
      return [] if states.nil?
      states.map { |code, data| data['name'] }.compact
    end
  end
end
