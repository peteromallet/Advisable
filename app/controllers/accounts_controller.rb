class AccountsController < ApplicationController
  attr_reader :account

  skip_before_action :verify_authenticity_token

  before_action :verify_key!
  before_action :create_account, only: [:user, :specialist]

  def me
    render json: {status: "OK."}
  end

  def user
    user = User.find_or_create_by!(account: account)

    [:first_name, :last_name, :email, :airtable_id, :company_name].each do |key|
      user.public_send("#{key}=", params[key]) if params[key].present?
    end
    user.save!

    render json: {user_uid: user.uid, account_uid: account.uid}
  end

  def specialist
    specialist = Specialist.find_or_create_by!(account: account)

    [:first_name, :last_name, :email, :airtable_id, :application_stage].each do |key|
      specialist.public_send("#{key}=", params[key]) if params[key].present?
    end
    specialist.save!

    render json: {specialist_uid: specialist.uid, account_uid: account.uid}
  end

  private

  def create_account
    verify_email!
    @account = Account.find_or_create_by!(email: account_params[:email])
    account.update!(account_params)
  end

  def account_params
    params.require(:account).permit(:first_name, :last_name, :email)
  end

  def verify_email!
    return if params[:email].present?
    render json: {error: "Can not create without email."}, status: :unprocessable_entity
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]
    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
