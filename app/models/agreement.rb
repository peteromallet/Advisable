# frozen_string_literal: true

class Agreement < ApplicationRecord
  include Uid

  STATUS_OPTIONS = %w[pending accepted declined].freeze
  COLLABORATION_OPTIONS = %w[fixed hourly flexible].freeze
  INVOICING_OPTIONS = %w[upfront recurring after flexible].freeze

  belongs_to :user
  belongs_to :company
  belongs_to :specialist
  has_many :messages, dependent: :nullify

  validates :status, inclusion: {in: STATUS_OPTIONS}
  validates :collaboration, inclusion: {in: COLLABORATION_OPTIONS}, allow_blank: true
  validates :invoicing, inclusion: {in: INVOICING_OPTIONS}, allow_blank: true

  scope :accepted, -> { where(status: "accepted") }
end

# == Schema Information
#
# Table name: agreements
#
#  id            :integer          not null, primary key
#  uid           :string           not null
#  user_id       :integer          not null
#  company_id    :uuid             not null
#  specialist_id :integer          not null
#  collaboration :string
#  invoicing     :string
#  status        :string
#  hourly_rate   :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_agreements_on_company_id     (company_id)
#  index_agreements_on_specialist_id  (specialist_id)
#  index_agreements_on_uid            (uid) UNIQUE
#  index_agreements_on_user_id        (user_id)
#
