class ZappierInteractorController < ApplicationController
  include MagicLinkHelper

  skip_before_action :verify_authenticity_token
  before_action :verify_key!

  def attach_previous_project_image
    previous_project = PreviousProject.find_by!(uid: params[:uid])
    raise ActiveRecord::RecordNotFound if params[:image_url].blank?

    AttachImageJob.perform_later(previous_project, params[:image_url])
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "No image attached."}, status: :unprocessable_entity
  end

  def create_magic_link
    account = find_account_from_uid(params[:uid])
    url = params[:url]
    options = {}
    options[:expires_at] = params[:expires_at] if params[:expires_at].present?
    link = magic_link(account, url, **options)
    render json: {magic_link: link}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Account not found"}, status: :unprocessable_entity
  end

  def enable_guild
    specialist = Specialist.find_by!(uid: params[:uid])
    specialist.update!(guild: true)
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Account not found"}, status: :unprocessable_entity
  end

  def boost_guild_post
    post = Guild::Post.find(params[:post_id])
    post.boost!
    render json: {status: "OK."}
  rescue ActiveRecord::RecordNotFound
    render json: {error: "Post not found"}, status: :unprocessable_entity
  rescue Guild::Post::BoostError => e
    render json: {error: e.message}, status: :unprocessable_entity
  end

  private

  def find_account_from_uid(uid)
    klass = case uid
            when /^spe/
              Specialist
            when /^use/
              User
            when /^acc/
              return Account.find_by!(uid: uid)
            else
              raise ActiveRecord::RecordNotFound
            end
    klass.public_send(:find_by!, uid: uid).account
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
