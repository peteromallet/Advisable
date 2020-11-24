class AdminSchema < GraphQL::Schema
  max_depth 15
  query Admin::Types::QueryType
  mutation Admin::Types::MutationType
end
