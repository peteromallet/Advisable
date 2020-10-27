class AccountsController < ApplicationController
  attr_reader :account

  skip_before_action :verify_authenticity_token

  before_action :verify_key!
  before_action :create_account, only: [:user, :specialist]

  def me
    render json: {status: "OK."}
  end

  def user
    user = User.find_or_create_by(account: account)
    [:airtable_id, :company_name].each do |key|
      user.public_send("#{key}=", params[key].strip) if params[key].present?
    end
    user.save!

    render json: {user_uid: user.uid, account_uid: account.uid}
  rescue ActiveRecord::RecordInvalid => e
    Raven.capture_exception(e, extra: {params: params})
    render json: {error: "Something went wrong."}, status: :unprocessable_entity
  end

  def specialist
    specialist = Specialist.find_or_create_by(account: account)
    [:airtable_id, :application_stage].each do |key|
      specialist.public_send("#{key}=", params[key].strip) if params[key].present?
    end
    specialist.save!

    render json: {specialist_uid: specialist.uid, account_uid: account.uid}
  rescue ActiveRecord::RecordInvalid => e
    Raven.capture_exception(e, extra: {params: params})
    render json: {error: "Something went wrong."}, status: :unprocessable_entity
  end

  private

  def create_account
    @account = Account.find_or_create_by!(email: account_params[:email].strip)
    [:first_name, :last_name].each do |key|
      account.public_send("#{key}=", params[key].strip) if params[key].present?
    end
    account.save!
  end

  def account_params
    @account_params ||= params.require(:account).permit(:first_name, :last_name, :email)
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]
    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
