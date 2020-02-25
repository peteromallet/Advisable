class AdvisableSchema < GraphQL::Schema
  max_depth 15
  query Types::QueryType
  mutation Types::MutationType

  rescue_from(ActiveRecord::RecordNotFound) do |e|
    raise ApiError::InvalidRequest.new("notFound", "Resouce was not found")
  end

  def self.unauthorized_field(error)
    raise GraphQL::ExecutionError.new(
      "Invalid permissions for #{error.field.graphql_name} field",
      options: {
        code: "invalidPermissions",
      }
    )
  end
end
