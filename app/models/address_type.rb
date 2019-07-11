class AddressType < ActiveRecord::Type::Hash
  def type_cast(value)
    {}
    # convert values like '$10.00' to 1000
  end
end