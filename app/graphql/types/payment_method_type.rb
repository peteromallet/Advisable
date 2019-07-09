class Types::PaymentMethodType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: false
  field :last4, String, null: false
  field :brand, String, null: false
  field :exp_month, String, null: false
  field :exp_year, String, null: false
  
  def name
    object.billing_details.name
  end

  def last4
    object.card.last4
  end

  def exp_month
    object.card.exp_month
  end

  def exp_year
    object.card.exp_year
  end

  def brand
    object.card.brand
  end
end
