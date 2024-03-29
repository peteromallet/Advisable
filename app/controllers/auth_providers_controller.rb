# frozen_string_literal: true

class AuthProvidersController < ApplicationController
  PROVIDERS = %i[linkedin google_oauth2 google_oauth2_calendar].freeze

  def create
    provider = params[:provider].to_sym
    raise ActionController::RoutingError, "Unknown provider" if PROVIDERS.exclude?(provider)

    public_send(provider)
  rescue => e
    Sentry.capture_exception(e, extra: {oauth: request.env["omniauth.auth"], oparams:})
    flash[:notice] = "Something went wrong."
    redirect_to "/login/signup"
  end

  def failure
    if params[:origin].present? && params["message"] == "user_cancelled_login"
      uri = URI.parse(params[:origin])
      params = URI.decode_www_form(uri.query || "") << ["authorization_failed", "Authorization failed. Please try again."]
      uri.query = URI.encode_www_form(params.to_h)
    else
      Sentry.capture_message("Something went wrong when authorizing with oauth.", level: "debug")
      uri = "/"
    end

    redirect_to uri.to_s
  end

  def linkedin
    omniauth = {
      uid: oauth.uid,
      provider: "linkedin",
      name: oauth.info.name,
      first_name: oauth.first_name,
      last_name: oauth.last_name,
      image: oauth.picture_url
    }

    session[:omniauth] = omniauth
    redirect_to request.env["omniauth.origin"]
  end

  def google_oauth2(retrying: false)
    account = Account.find_by(email: oauth.email) || create_account!

    if account
      auth_provider = account.auth_providers.find_or_initialize_by(provider: "google_oauth2")
      auth_provider.update!(oauth.identifiers_with_blob_and_token)
      session_manager.login(account)
      redirect_to oparams["navigate"] || "/"
    else
      flash[:notice] = "No account with that email found, please sign up."
      redirect_to "/login/signup"
    end
  rescue ActiveRecord::RecordInvalid => e
    raise unless !retrying && e.message == "Validation failed: Uid has already been taken" && !retrying

    AuthProvider.find_by(provider: "google_oauth2", uid: oauth.uid).destroy!
    retrying = true
    retry
  end

  def google_oauth2_calendar
    account = Account.find_by!(email: oauth.email)
    auth_provider = account.auth_providers.find_or_initialize_by(provider: "google_oauth2_calendar")
    auth_provider.update!(oauth.identifiers_with_blob_and_token)
    session_manager.login(account)

    redirect_to "/"
  rescue ActiveRecord::RecordNotFound
    flash[:notice] = "No account with that email found, please sign up."
    redirect_to "/login/signup"
  end

  private

  def oparams
    request.env["omniauth.params"]
  end

  def create_account!
    return if oparams["mode"].blank?

    account = Account.new(
      email: oauth.email,
      first_name: oauth.info.first_name,
      last_name: oauth.info.last_name,
      password: SecureRandom.hex,
      confirmed_at: Time.current
    )

    common_attrs = {
      account:,
      campaign_name: oparams[:utm_name],
      campaign_source: oparams[:utm_source],
      campaign_medium: oparams[:utm_medium]
    }

    case oparams["mode"]
    when "user"
      account.permissions = [:team_manager]
      User.create!(common_attrs.merge(company: Company.new, application_status: "Application Started"))
    when "specialist"
      referrer = Specialist.find_by(uid: oparams["referrer"])
      Specialist.create!(common_attrs.merge(application_stage: "Started", referrer_id: referrer&.id))
    else
      raise "Unknown mode #{oparams["mode"]}"
    end

    GeocodeAccountJob.perform_later(account, client_ip)

    account
  end

  def oauth
    @oauth ||= Oauth.new(request.env["omniauth.auth"])
  end
end
