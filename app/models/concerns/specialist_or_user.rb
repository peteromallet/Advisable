# The SpecialistOrUser module contains of all the login for user accounts. Both Users and
# Specialists are able to login to the system and act as user accounts.
module SpecialistOrUser
  extend ActiveSupport::Concern
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

  included do
    include Tutorials
    include Permissions

    has_secure_password validations: false
    validates :password, length: {minimum: 8}, allow_blank: true, confirmation: true
    validate :email_not_taken
    validates :email, format: {with: VALID_EMAIL_REGEX}

    # Temporary while we're moving things over
    belongs_to :account
    before_validation :ensure_account_exists
    before_save :copy_data_to_account

    # Needed for frontend stuff
    def confirmed
      confirmed_at.present?
    end

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

    def ensure_account_exists
      return if self[:email].blank?
      if account.blank?
        self.account = Account.find_or_create_by!(email: self[:email])
      elsif account.new_record?
        account.save!
      end
    end

    def copy_data_to_account
      self.account = Account.create! if account.blank?
      data = Account::COPYABLE_COLUMNS.index_with { |column| attributes[column] }
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

  [
    :find_by_uid_or_airtable_id,
    :find_by_uid,
    :find_by_airtable_id,
    :find_by_email,
    :find_by_remember_token
  ].each do |method|
    define_singleton_method(method) do |param|
      Specialist.public_send(method, param) || User.public_send(method, param)
    end

    define_singleton_method("#{method}!") do |param|
      public_send(method, param).presence || raise(ActiveRecord::RecordNotFound)
    end
  end
end
