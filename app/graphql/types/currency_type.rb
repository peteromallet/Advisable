class Types::CurrencyType < Types::BaseType
  field :iso_code, String, null: false
  field :name, String, null: false
  field :symbol, String, null: false
end
