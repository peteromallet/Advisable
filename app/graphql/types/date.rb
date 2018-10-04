class Types::Date < GraphQL::Schema::Scalar
  def self.coerce_input(value, context)
    Date.parse(value)
  end

  def self.coerce_result(value, context)
    value.iso8601
  end
end
