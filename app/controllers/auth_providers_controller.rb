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
    token_data = auth_hash[:credentials]
    token_data[:code] = params[:code]
    session[:omniauth_token_data] = token_data.dup
    token_data[:json] = token_data.to_json
    token_data[:auth_hash] = auth_hash.to_json

    render plain: token_data.map { |k, v| "#{k}: #{v}" }.join("\n\n")
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
