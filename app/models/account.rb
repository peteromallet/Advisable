class Account < ApplicationRecord
  include Uid

  IGNORED_COLUMNS_FOR_COPYING = ["id", "uid", "updated_at", "created_at"].freeze
  COPYABLE_COLUMNS = column_names - IGNORED_COLUMNS_FOR_COPYING

  belongs_to :country, required: false
  has_one :user, dependent: :nullify # Change to :destroy
  has_one :specialist, dependent: :nullify # Change to :destroy
  has_many :magic_links, dependent: :destroy

  has_secure_password validations: false
  validates_confirmation_of :password
  validates :password, length: {minimum: 8}, allow_blank: true
  validates :email, uniqueness: true, allow_blank: true, format: {with: /@/}

  def has_account?
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
      break token unless self.class.where(remember_token: token).exists?
    end
  end

  # TODO: Look into this method
  def create_confirmation_token
    token = Token.new
    self.confirmation_digest = Token.digest(token)
    # eventually this shouldnt be stored in the DB. We have stored it for now
    # so that we can manually resend confirmation emails.
    self.confirmation_token = token
    save(validate: false)
    token
  end
end

# == Schema Information
#
# Table name: accounts
#
#  id                  :bigint           not null, primary key
#  campaign_name       :string
#  campaign_source     :string
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
#  country_id          :bigint
#
# Indexes
#
#  index_accounts_on_country_id  (country_id)
#  index_accounts_on_email       (email) UNIQUE
#  index_accounts_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#
