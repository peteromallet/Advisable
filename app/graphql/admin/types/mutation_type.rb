class Admin::Types::MutationType < GraphQL::Schema::Object
  Advisatable::Resource.descendants.each do |admin|
    field admin.update_mutation_name, mutation: admin.update_mutation
  end
end
