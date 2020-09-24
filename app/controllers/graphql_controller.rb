class GraphqlController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token,
                     if: -> { Rails.env == 'development' }

  def execute
    pp session[:omniauth_token_data]
    # session.delete(:omniauth)
    variables = ensure_hash(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      request: request,
      client_ip: client_ip,
      session_manager: session_manager,
      current_user: current_user,
      oauth_viewer:
        session[:omniauth] ? OauthViewer.new(session[:omniauth]) : nil
    }
    result =
      AdvisableSchema.execute(
        query,
        variables: variables, context: context, operation_name: operation_name
      )
    render json: result
  end

  private

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
