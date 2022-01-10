# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ActiveStorage::SetCurrent
  include CurrentUser

  before_action :set_sentry_context
  before_action :prefetch_viewer
  before_action :authenticate_with_magic_link, only: %i[frontend guild_post]

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: :not_found, json: {error: "Not Found"}
  end

  def guild_post
    @guild_post = Guild::Post.published.find_by(shareable: true, id: params[:id]) if params[:id]
  end

  def client_ip
    request.env["HTTP_X_FORWARDED_FOR"].try(:split, ",").try(:first) ||
      request.env["REMOTE_ADDR"]
  end

  def case_study
    @case_study = ::CaseStudy::Article.find_by_slug_or_id!(params[:id])
    Sentry.capture_message("Redirecting case study URL", level: "debug")
    redirect_to @case_study.path
  end

  def set_sentry_context
    if current_user.present?
      Sentry.set_user(
        id: current_user.id,
        email: current_user.account.email,
        username: current_user.account.name,
        is_admin: current_account.admin?,
        account_name: current_account.name
      )
    else
      Sentry.set_user(id: nil)
    end
  end

  protected

  def prefetch_viewer
    prefetch_query("app/javascript/src/graphql/queries/getViewer.graphql")
  end

  def prefetch_query(path, variables: {})
    @prefetched_queries ||= []
    query = GraphqlFileParser.import(path)
    result = AdvisableSchema.execute(query, context: graphql_context, variables:)
    @prefetched_queries << {query:, result:, variables:}
  end

  def graphql_context
    {
      request:,
      client_ip:,
      session_manager:,
      current_user:,
      current_account:,
      oauth_viewer: session[:omniauth] ? OauthViewer.new(session[:omniauth]) : nil
    }
  end
end
