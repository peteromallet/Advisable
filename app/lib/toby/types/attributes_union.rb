class Toby::Types::AttributesUnion < GraphQL::Schema::Union
  possible_types(*Toby::Attributes.attribute_classes.map(&:attribute_type))

  def self.resolve_type(object, context)
    object.class.attribute_type
  end
end
