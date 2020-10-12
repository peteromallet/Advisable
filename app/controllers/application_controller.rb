class ApplicationController < ActionController::Base
  include CurrentUser

  before_action :prefetch_viewer
  before_action :set_sentry_context
  before_action :authenticate_with_magic_link, only: [:frontend, :guild]

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: :not_found, json: {error: 'Not Found'}
  end

  def guild
  end

  def internal
    return if current_account&.admin?

    redirect_to "/"
  end

  def advisatable
    return if current_account&.admin?

    redirect_to "/"
  end

  def client_ip
    request.env['HTTP_X_FORWARDED_FOR'].try(:split, ',').try(:first) ||
      request.env['REMOTE_ADDR']
  end

  protected

  def prefetch_query(path, variables = {})
    @prefetched_queries ||= []
    query = Rails.cache.fetch(path) { GraphqlFileParser.import(path) }
    result = AdvisableSchema.execute(query, variables: variables, context: graphql_context)

    @prefetched_queries << {
      query: result.query.query_string.delete("\n"),
      variables: variables,
      result: result
    }
  end

  private

  def graphql_context
    {
      request: request,
      client_ip: client_ip,
      session_manager: session_manager,
      current_user: current_user,
      current_account: current_account,
      oauth_viewer:
        session[:omniauth] ? OauthViewer.new(session[:omniauth]) : nil
    }
  end

  def prefetch_viewer
    prefetch_query("app/javascript/src/graphql/queries/getViewer.graphql")
  end

  def set_sentry_context
    if current_user.present?
      Raven.user_context(
        id: current_user.id,
        email: current_user.account.email,
        username: current_user.account.name
      )
    else
      Raven.user_context(nil)
    end
  end
end
