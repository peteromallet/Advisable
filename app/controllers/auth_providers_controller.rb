class AuthProvidersController < ApplicationController
  def create
    provider = params[:provider].to_sym
    if self.respond_to?(provider)
      self.send(provider)
    else
      raise ActionController::RoutingError.new('Unknown provider')
    end
  end

  def linkedin
    user = {
      uid: auth_hash.uid,
      provider: 'linkedin',
      name: auth_hash.info.name,
      first_name: auth_hash.info.first_name,
      last_name: auth_hash.info.last_name,
      image: auth_hash.info.picture_url
    }

    session[:omniauth] = user
    redirect_to request.env['omniauth.origin']
  end

  def linkedin_ads
    auth_provider = current_user.auth_providers.find_or_initialize_by(provider: 'linkedin_ads')
    auth_provider.update!(oauth.identifiers_with_blob_and_token)

    redirect_to admin_applications_path
  end

  private

  def oauth
    @oauth ||= Oauth.new(request.env["omniauth.auth"])
  end

  def auth_hash
    request.env['omniauth.auth']
  end
end
