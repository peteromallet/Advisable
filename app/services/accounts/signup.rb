# Handles the signup proress for an account. By defualt this service will create
# a new "User", however, you can also pass type: "Specialist" to signup as a
# Specialist
class Accounts::Signup < ApplicationService
  attr_reader :type, :email, :password, :password_confirmation

  def initialize(type: "User", email:, password:, password_confirmation:)
    @type = type
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    account.assign_attributes(
      password: password,
      password_confirmation: password_confirmation
    )

    if account.save
      account.send_confirmation_email
      account
    else
      raise Service::Error.new(account.errors.full_messages.first)
    end
  end

  private

  def account
    @account ||= begin
      return specialist_account if type == "Specialist"
      user_account 
    end
  end

  def user_account
    User.find_or_initialize_by(email: email.downcase, password_digest: nil)
  end

  def specialist_account
    specialist = Specialist.find_by(email: email.downcase, password_digest: nil)
    return specialist if specialist.present?
    raise Service::Error.new("Specialist does not exist")
  end
end