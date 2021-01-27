class Toby::Schema < GraphQL::Schema
  query Toby::Types::QueryType
  # mutation Admin::Types::MutationType
end
