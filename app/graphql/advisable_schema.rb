# frozen_string_literal: true

class AdvisableSchema < GraphQL::Schema
  use GraphQL::Subscriptions::ActionCableSubscriptions
  max_depth 15
  query Types::QueryType
  mutation Types::MutationType
  subscription Types::SubscriptionType

  rescue_from(ActiveRecord::RecordNotFound) do
    ApiError.invalid_request("NOT_FOUND", "Resouce was not found")
  end

  rescue_from(ActiveRecord::RecordInvalid) do |e|
    ApiError.invalid_request("RECORD_INVALID", e.record.errors.full_messages.first)
  end

  def self.unauthorized_field(error)
    raise GraphQL::ExecutionError.new("Invalid permissions for #{error.field.graphql_name} field", extensions: {code: 'INVALID_PERMISSIONS_FOR_FIELD'})
  end
end
