# frozen_string_literal: true

class Agreement < ApplicationRecord
  include Uid

  COLLABORATION_OPTIONS = %w[fixed hourly flexible].freeze
  INVOICING_OPTIONS = %w[upfront recurring after flexible].freeze
  STATUS_OPTIONS = %w[pending accepted declined].freeze

  belongs_to :user
  belongs_to :company
  belongs_to :specialist
  has_many :messages, dependent: :nullify

  validates :collaboration, inclusion: {in: COLLABORATION_OPTIONS}, allow_blank: true
  validates :invoicing, inclusion: {in: INVOICING_OPTIONS}, allow_blank: true
  validates :status, inclusion: {in: STATUS_OPTIONS}
end

# == Schema Information
#
# Table name: agreements
#
#  id            :bigint           not null, primary key
#  collaboration :string
#  hourly_rate   :integer
#  invoicing     :string
#  status        :string
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  company_id    :uuid             not null
#  specialist_id :bigint           not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_agreements_on_company_id     (company_id)
#  index_agreements_on_specialist_id  (specialist_id)
#  index_agreements_on_uid            (uid) UNIQUE
#  index_agreements_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (company_id => companies.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (user_id => users.id)
#
