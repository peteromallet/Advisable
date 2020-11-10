class Account < ApplicationRecord
  include Uid
  include Permissions

  has_one :user, dependent: :nullify # Change to :destroy
  has_one :specialist, dependent: :nullify # Change to :destroy
  has_many :magic_links, dependent: :destroy
  has_many :auth_providers, dependent: :destroy

  has_secure_password validations: false
  validates :password, length: {minimum: 8}, allow_blank: true, confirmation: true
  validates :email, uniqueness: true, presence: true, format: {with: /@/}

  def specialist_or_user
    specialist || user
  end

  def name
    "#{first_name} #{last_name}"
  end

  def has_password?
    password_digest.present?
  end

  def clear_remember_token
    update_columns(remember_token: nil) # rubocop:disable Rails/SkipsModelValidations
  end

  def generate_remember_token
    update_columns(remember_token: new_remember_token) # rubocop:disable Rails/SkipsModelValidations
  end

  def new_remember_token
    loop do
      token = Nanoid.generate(size: 25)
      break token unless self.class.exists?(remember_token: token)
    end
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

  def reset_password!
    token = Token.new
    self.reset_digest = Token.digest(token)
    self.reset_sent_at = Time.zone.now
    save!
    AccountMailer.reset_password(id: id, token: token).deliver_later
  end
end

# == Schema Information
#
# Table name: accounts
#
#  id                  :bigint           not null, primary key
#  completed_tutorials :jsonb
#  confirmation_digest :string
#  confirmation_token  :string
#  confirmed_at        :datetime
#  email               :citext
#  first_name          :string
#  last_name           :string
#  password_digest     :string
#  permissions         :jsonb
#  remember_token      :string
#  reset_digest        :string
#  reset_sent_at       :datetime
#  test_account        :boolean
#  uid                 :string
#  vat_number          :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
# Indexes
#
#  index_accounts_on_email  (email) UNIQUE
#  index_accounts_on_uid    (uid) UNIQUE
#
