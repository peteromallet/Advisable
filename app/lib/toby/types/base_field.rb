class Toby::Types::BaseField < GraphQL::Schema::Field
  attr_reader :model

  def model_class(name)
    @model = name
  end
end
