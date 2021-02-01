class Toby::Resolvers::Collection < GraphQL::Schema::Resolver
  def resolve(lookahead:, filter:)
    values = field.model.all
    filter.each do |filter_name, filter_value|
      if filter_value.key?("contains")
        values = values.where("#{filter_name} ilike ?", "%#{filter_value["contains"]}%")
      end
    end
    values
  end
end
