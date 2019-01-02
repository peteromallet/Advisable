class User < ApplicationRecord
  include UID
  include Permissions
  has_many :projects
  has_secure_password validations: false
  has_many :interviews
  belongs_to :country, required: false

  before_save :remove_past_availabililty

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, allow_blank: true, format: { with: VALID_EMAIL_REGEX }
  validates_confirmation_of :password
  validates :password, length: { minimum: 8 }, allow_blank: true

  attribute :availability, :datetime, default: [], array: true

  def name
    "#{first_name} #{last_name}"
  end

  def confirmed
    confirmed_at.present?
  end

  def setup_required
    !airtable_id
  end

  def has_account?
    password_digest.present?
  end

  # Always lowercase the email
  def email=(address)
    self[:email] = address.downcase
  end

  def send_confirmation_email
    token = Token.new
    self.confirmation_digest = Token.digest(token)
    save(validate: false)
    UserMailer.confirm(id: id, token: token).deliver_later
  end

  private

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?
    self.availability = availability.select do |time|
      time > DateTime.now.utc
    end
  end
end
