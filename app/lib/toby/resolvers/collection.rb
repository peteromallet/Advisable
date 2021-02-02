class Toby::Resolvers::Collection < GraphQL::Schema::Resolver
  def resolve(lookahead:, filter: nil)
    values = field.model.all
    return values if filter.nil?

    filter.each do |name, filters|
      filters.arguments.argument_values.each do |_method, argument|
        type = argument.definition.type_class.type
        filter_class = type.respond_to?(:of_type) ? type.of_type.of_type : type
        values = filter_class.apply(values, name, argument.value)
      end
    end
    values
  end
end
