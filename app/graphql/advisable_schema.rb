class AdvisableSchema < GraphQL::Schema
  max_depth 15
  query Types::QueryType
  mutation Types::MutationType
  use GraphQL::Pagination::Connections
  rescue_from(ActiveRecord::RecordNotFound) do |e|
    raise ApiError::InvalidRequest.new('notFound', 'Resouce was not found')
  end

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    raise ApiError::InvalidRequest.new('RECORD_INVALID', e.record.errors.full_messages.first)
  end

  def self.unauthorized_field(error)
    raise GraphQL::ExecutionError.new(
            "Invalid permissions for #{error.field.graphql_name} field",
            options: {code: 'invalidPermissions'}
          )
  end
end
