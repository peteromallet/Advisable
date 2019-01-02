# Sets up a user account by setting the users name and country and creating a
# client record for them
class Users::Setup < ApplicationService
  attr_reader :first_name, :last_name, :company_name, :country_name, :user

  def initialize(first_name:, last_name:, company_name:, country_name:, user:)
    @first_name = first_name
    @last_name = last_name
    @company_name = company_name
    @country_name = country_name
    @user = user
  end

  def call
    user.update_attributes(
      first_name: first_name,
      last_name: last_name,
      country: country,
      company_name: company_name
    )

    sync_to_airtable

    user
  end

  private

  def country
    @country ||= Country.find_by_name!(country_name)
  end

  def sync_to_airtable
    sync_user_to_airtable
  end

  def sync_user_to_airtable
    record = if user.airtable_id
      Airtable::ClientContact.find(user.airtable_id)
    else
      Airtable::ClientContact.new({})
    end

    record.push(user)
  end
end