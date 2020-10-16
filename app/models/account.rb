class Account < ApplicationRecord
  include Uid
  include Permissions

  IGNORED_COLUMNS_FOR_COPYING = ["id", "uid", "updated_at", "created_at"].freeze
  MIGRATED_COLUMNS = %w[
    email password_digest remember_token confirmed_at confirmation_digest confirmation_token reset_digest reset_sent_at test_account vat_number permissions completed_tutorials first_name last_name
  ].freeze
  COPYABLE_COLUMNS = column_names - IGNORED_COLUMNS_FOR_COPYING - MIGRATED_COLUMNS

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
    update_columns(remember_token: nil)
  end

  def generate_remember_token
    update_columns(remember_token: new_remember_token)
  end

  def new_remember_token
    loop do
      token = Nanoid.generate(size: 25)
      break token unless self.class.exists?(remember_token: token)
    end
  end

  # TODO: AccountMigration - Look into this method
  def create_confirmation_token
    token = Token.new
    self.confirmation_digest = Token.digest(token)
    # eventually this shouldnt be stored in the DB. We have stored it for now
    # so that we can manually resend confirmation emails.
    self.confirmation_token = token
    save(validate: false)
    token
  end

  # TODO: AccountMigration - log usage and remove all usages until this can be deleted
  def method_missing(method, *args, **options, &block)
    Rails.logger.info("Method called on Account from #{caller.select { |path| path =~ %r{app/} }.to_json}")

    if options.present?
      specialist_or_user.public_send(method, *args, **options, &block)
    else
      specialist_or_user.public_send(method, *args, &block)
    end
  end

  def respond_to_missing?(method, *args, **options)
    specialist_or_user.respond_to?(method)
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
