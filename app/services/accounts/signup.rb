# Service object to handle the creation of an account.
class Accounts::Signup < ApplicationService
  attr_accessor :airtable_id, :email, :password, :password_confirmation

  def initialize(airtable_id:, email:, password:, password_confirmation:)
    @airtable_id = airtable_id
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    account_already_exists?
    account.assign_attributes(
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )

    if account.save
      account.send_confirmation_email
      # Sync the record to airtable incase the email was updated.
      account.sync_to_airtable
      account
    else
      raise Service::Error.new(account.errors.full_messages.first)
    end
  end

  private

  def account
    @account ||= begin
      a = Account.find_by_airtable_id(airtable_id)
      if a.present?
        @account = a
      else
        raise Service::Error.new("account_not_found")
      end
    end
  end

  def account_already_exists?
    raise Service::Error.new("account_already_exists") if account.has_account?
  end
end