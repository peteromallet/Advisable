# The Account module contains of all the login for user accounts. Both User's
# Specialist's are able to login to the system and act as user accounts.
module Account
  extend ActiveSupport::Concern
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  included do
    include Permissions

    has_secure_password validations: false
    validates_confirmation_of :password
    validates :password, length: { minimum: 8 }, allow_blank: true
    validates :email, uniqueness: true, allow_blank: true, format: {
      with: VALID_EMAIL_REGEX
    }

    # Returns werther or not the record has set a password. Due to the fact that
    # records are synced from airtable, it's likely that an account already
    # exists before a password it created for it.
    def has_account?
      password_digest.present?
    end

    # Always lowercase the email
    def email=(address)
      self[:email] = address.try(:downcase)
    end

    # Wether or not the account has been confirmed via email.
    def confirmed
      confirmed_at.present?
    end

    # Sets the confirmation digest and sends the user a confirmation email with
    # instructions to confirm their account.
    def send_confirmation_email
      token = Token.new
      self.confirmation_digest = Token.digest(token)
      save(validate: false)
      UserMailer.confirm(id: id, token: token).deliver_later
    end
  end

  # Returns a user or specialist with a given uid.
  def self.find_by_uid(uid)
    User.find_by_uid(uid) || Specialist.find_by_uid(uid)
  end

  def self.find_by_uid!(uid)
    record = find_by_uid(uid)
    return record if record.present?
    raise ActiveRecord::RecordNotFound
  end

  # Returns a user or specialist with a given email
  def self.find_by_email(email)
    User.find_by_email(email) || Specialist.find_by_email(email)
  end

  def self.find_by_email!(email)
    record = find_by_email(email)
    return record if record.present?
    raise ActiveRecord::RecordNotFound
  end
end