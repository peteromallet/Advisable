# Service object for handeling the creation of freelancer accounts. Due to the 
# fact that specialsits go through an application process first, their account
# will already exist in the system. For this reason, the signup process for
# freelancers is done by ID rather than email because we do want to allow
# freelancers to create new accounts, only claim their existing one.
class Specialists::CreateAccount < ApplicationService
  attr_accessor :specialist, :email, :password, :password_confirmation

  def initialize(specialist:, email:, password:, password_confirmation:)
    @specialist = specialist
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    account_already_exists?
    specialist.assign_attributes(
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )

    if specialist.save
      specialist.send_confirmation_email
      specialist.sync_to_airtable
      specialist
    else
      raise Service::Error.new(specialist.errors.full_messages.first)
    end
  end

  private

  def account_already_exists?
    raise Service::Error.new("account_already_exists") if specialist.has_account?
  end
end