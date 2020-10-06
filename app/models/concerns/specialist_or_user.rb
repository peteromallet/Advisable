# The SpecialistOrUser module contains of all the login for user accounts. Both Users and
# Specialists are able to login to the system and act as user accounts.
module SpecialistOrUser
  extend ActiveSupport::Concern
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

  included do
    include Tutorials
    include Permissions

    has_secure_password validations: false
    validates_confirmation_of :password
    validates :password, length: {minimum: 8}, allow_blank: true
    validate :email_not_taken
    validates :email, allow_blank: true, format: {with: VALID_EMAIL_REGEX}

    # Temporary while we're moving things over
    belongs_to :account, required: false
    before_save :copy_data_to_account

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

    def self.remember_token
      loop do
        token = Nanoid.generate(size: 25)
        existing = find_by_remember_token(token)
        break token unless existing
      end
    end

    def generate_remember_token
      self.remember_token = self.class.remember_token
      save(validate: false)
    end

    def clear_remember_token
      self.remember_token = nil
      save(validate: false)
    end

    def create_confirmation_token
      token = Token.new
      self.confirmation_digest = Token.digest(token)
      # eventually this shouldnt be stored in the DB. We have stored it for now
      # so that we can manually resend confirmation emails.
      self.confirmation_token = token
      save(validate: false)
      token
    end

    # Sets the confirmation digest and sends the user a confirmation email with
    # instructions to confirm their account.
    def send_confirmation_email
      token = create_confirmation_token
      AccountMailer.confirm(uid: uid, token: token).deliver_later
    end

    def copy_data_to_account
      self.account = Account.create! if account.blank?
      data = Account::COPYABLE_COLUMNS.map { |column| [column, attributes[column]] }.to_h
      account.update_columns(data)
    end

    private

    # Validate that the email does not already exist as a user or specialist
    def email_not_taken
      return if email.blank?
      existing = SpecialistOrUser.find_by_email(email.downcase)
      return if persisted? && existing == self
      errors.add(:email, :taken) if existing.present?
    end
  end

  def self.find_by_uid_or_airtable_id(id)
    User.find_by_uid_or_airtable_id(id) || Specialist.find_by_uid_or_airtable_id(id)
  end

  def self.find_by_uid_or_airtable_id!(id)
    find_by_uid_or_airtable_id(id).presence || raise(ActiveRecord::RecordNotFound)
  end

  def self.find_by_uid(uid)
    User.find_by_uid(uid) || Specialist.find_by_uid(uid)
  end

  def self.find_by_uid!(uid)
    find_by_uid(uid).presence || raise(ActiveRecord::RecordNotFound)
  end

  def self.find_by_airtable_id(id)
    User.find_by_airtable_id(id) || Specialist.find_by_airtable_id(id)
  end

  def self.find_by_airtable_id!(id)
    find_by_airtable_id(id).presence || raise(ActiveRecord::RecordNotFound)
  end

  def self.find_by_email(email)
    User.find_by_email(email) || Specialist.find_by_email(email)
  end

  def self.find_by_email!(email)
    find_by_email(email).presence || raise(ActiveRecord::RecordNotFound)
  end

  def self.find_by_remember_token(token)
    User.find_by_remember_token(token) || Specialist.find_by_remember_token(token)
  end
end
