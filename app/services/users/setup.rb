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
      country: country
    )

    client.users << user
    user
  end

  private

  def client
    @client ||= user.client || Client.create(name: company_name)
  end

  def country
    @country ||= Country.find_by_name!(country_name)
  end
end