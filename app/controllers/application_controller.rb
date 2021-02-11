# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include CurrentUser

  before_action :set_sentry_context
  before_action :authenticate_with_magic_link, only: %i[frontend guild]
  before_action :set_guild_post, only: [:guild], if: -> { params[:guild_post_id] }

  def frontend
    respond_to(&:html)
  rescue ActionController::UnknownFormat
    render status: :not_found, json: {error: 'Not Found'}
  end

  def guild; end

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

  def set_guild_post
    @guild_post = Guild::Post.published.find_by(shareable: true, id: params[:guild_post_id])
  end
end
