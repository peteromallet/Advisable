class Account < ApplicationRecord
  include Uid

  belongs_to :country, required: false
  has_one :user, dependent: :nullify # Change to :destroy
  has_one :specialist, dependent: :nullify # Change to :destroy
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
#  email               :string
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
#  index_accounts_on_email       (email)
#  index_accounts_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#
