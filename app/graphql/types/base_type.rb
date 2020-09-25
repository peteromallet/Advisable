class Types::BaseType < GraphQL::Schema::Object
  field_class BaseField

  def current_user
    context[:current_user]
  end
end
