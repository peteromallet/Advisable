# frozen_string_literal: true

class GraphqlController < ApplicationController
  before_action :require_admin, only: :toby
  before_action :set_timezone

  def execute
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    result = with_query_tracing do
      AdvisableSchema.execute(
        query,
        variables:, context: graphql_context, operation_name:
      )
    end
    render json: result
  end

  def toby
    result = with_query_tracing do
      Toby::Schema.execute(
        params[:query],
        variables: ensure_hash(params[:variables]),
        context: {session_manager:},
        operation_name: params[:operationName]
      )
    end
    render json: result
  end

  private

  def set_timezone
    return if !current_account ||
              request.headers["X-TIMEZONE"].blank? ||
              current_account.timezone.present?

    current_account.update(timezone: request.headers["X-TIMEZONE"])
  end

  def with_query_tracing
    return yield unless Rails.env.development?

    result = nil
    queries = ::SqlSpy.track { result = yield }
    Rails.logger.info(ActiveSupport::LogSubscriber.new.__send__(:color, "\nQuery Count: #{queries.size}\n", :red))
    result
  end

  def verify_authenticity_token
    return if Rails.env.development?
    return if ENV["GRAPHIQL"].present?
    return if ENV["API_ACCESS_KEY"].present? && request.headers["Api-Key"] == ENV["API_ACCESS_KEY"]

    super
  rescue ActionController::InvalidAuthenticityToken
    Sentry.capture_message(
      "Invalid CSRF token",
      level: "debug",
      extra: {
        session: session.to_json,
        jrrTolkien: request.headers["X-CSRF-Token"]
      }
    )

    render status: :unprocessable_entity, json: {message: "INVALID_CSRF"}
  end

  def require_admin
    return if current_account&.admin?

    render status: :not_found, json: {error: "Not Found"}
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
