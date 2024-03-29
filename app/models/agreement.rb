# frozen_string_literal: true

class Agreement < ApplicationRecord
  include Uid

  has_logidze

  DEFAULT_DUE_DAYS = 5
  VALID_STATUSES = %w[pending accepted declined].freeze
  VALID_COLLABORATIONS = %w[fixed hourly flexible].freeze
  VALID_INVOICINGS = %w[upfront recurring after flexible].freeze

  belongs_to :user
  belongs_to :company
  belongs_to :specialist
  has_many :messages, dependent: :nullify
  has_many :payment_requests, dependent: :nullify

  validates :status, inclusion: {in: VALID_STATUSES}
  validates :collaboration, inclusion: {in: VALID_COLLABORATIONS}, allow_blank: true
  validates :invoicing, inclusion: {in: VALID_INVOICINGS}, allow_blank: true

  VALID_STATUSES.each do |status|
    scope status, -> { where(status:) }
  end

  def self.latest_for(specialist:, user:)
    by_specialist = order(created_at: :desc).where(specialist:)
    by_specialist.where(user:).first || by_specialist.where(company: user.company).first
  end

  def due_days
    super.presence || DEFAULT_DUE_DAYS
  end

  def acceptable?
    status == "pending"
  end
  alias_method :declinable?, :acceptable?
end

# == Schema Information
#
# Table name: agreements
#
#  id            :bigint           not null, primary key
#  collaboration :string
#  due_days      :integer
#  hourly_rate   :integer
#  invoicing     :string
#  reason        :string
#  reminded_at   :datetime
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
