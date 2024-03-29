# frozen_string_literal: true

class AccountsController < ApplicationController
  ZAPIER_ACCOUNT_ID = 99999

  attr_reader :account

  skip_before_action :verify_authenticity_token

  before_action :verify_key!
  before_action :create_account, only: %i[user specialist]

  def me
    render json: {status: "OK."}
  end

  def user
    user = User.find_or_create_by(account:) do |u|
      u.company = Company.create
      account.permissions << :team_manager
      account.save!
    end
    user.company.update(name: params[:company_name].strip) if params[:company_name].present?
    user.airtable_id = params[:airtable_id].strip if params[:airtable_id].present?

    Logidze.with_responsible(user.account_id) do
      user.save!
    end

    render json: {user_uid: user.uid, account_uid: account.uid}
  rescue ActiveRecord::RecordInvalid => e
    Sentry.capture_exception(e, extra: {params:})
    render json: {error: "Something went wrong."}, status: :unprocessable_entity
  end

  def specialist
    specialist = Specialist.find_or_create_by(account:)
    %i[airtable_id application_stage].each do |key|
      specialist.public_send("#{key}=", params[key].strip) if params[key].present?
    end
    Logidze.with_responsible(specialist.account_id) do
      specialist.save!
    end

    render json: {specialist_uid: specialist.uid, account_uid: account.uid}
  rescue ActiveRecord::RecordInvalid => e
    Sentry.capture_exception(e, extra: {params:})
    render json: {error: "Something went wrong."}, status: :unprocessable_entity
  end

  private

  def create_account
    @account = Account.find_or_create_by!(email: account_params[:email].strip)
    %i[first_name last_name].each do |key|
      account.public_send("#{key}=", params[key].strip) if params[key].present?
    end

    Logidze.with_responsible(ZAPIER_ACCOUNT_ID) do
      account.save!
    end
  end

  def account_params
    @account_params ||= params.require(:account).permit(:first_name, :last_name, :email)
  end

  def verify_key!
    return if params[:key].present? && params[:key] == ENV["ACCOUNTS_CREATE_KEY"]

    render json: {error: "You are not authorized to perform this action."}, status: :unauthorized
  end
end
