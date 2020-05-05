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
    # session[:omniauth] = auth_hash
    puts '😉' * 20
    puts auth_hash
    puts ' - '
    user = {
      uid: auth_hash.uid,
      provider: 'linkedin',
      name: auth_hash.info.name,
      first_name: auth_hash.info.first_name,
      image: auth_hash.info.image
    }

    puts user
    redirect_to request.env['omniauth.origin']
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
