# frozen_string_literal: true

class GraphqlController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :require_admin, only: :toby
  skip_before_action :verify_authenticity_token, if: -> { Rails.env.development? }

  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    result = AdvisableSchema.execute(
      query,
      variables: variables, context: graphql_context, operation_name: operation_name
    )
    render json: result
  end

  def toby
    render json: Toby::Schema.execute(
      params[:query],
      variables: ensure_hash(params[:variables]),
      context: {session_manager: session_manager},
      operation_name: params[:operationName]
    )
  end

  private

  def require_admin
    return if current_account&.admin?

    render status: :not_found, json: {error: 'Not Found'}
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param)
    case ambiguous_param
    when String
      ambiguous_param.present? ? ensure_hash(JSON.parse(ambiguous_param)) : {}
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
