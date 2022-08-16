# frozen_string_literal: true

module Types
  class CountryType < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :code, String, null: true, method: :alpha2
    field :name, String, null: false
    field :states, [String], null: false

    def states
      Rails.cache.fetch("#{object.name}_states", expires_in: 7.days) do
        states = object.data.try(:states)
        return [] if states.nil?

        states.filter_map { |_code, data| data["name"] }
      end
    end

    field :eu, Boolean, null: true
    field :currency, Types::CurrencyType, null: true

    def currency
      Rails.cache.fetch("#{object.name}_currency") { object.data.try(:currency) }
    end
  end
end
