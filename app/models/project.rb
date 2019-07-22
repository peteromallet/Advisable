class Project < ApplicationRecord
  include UID
  include Airtable::Syncable
  has_many :applications
  has_many :bookings, through: :applications
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills
  validates :service_type, inclusion: { in: %w(Assisted Self-Service) }, allow_nil: true
  belongs_to :user, required: false
  validates :name, presence: true

  def accepted_terms=(accepted)
    self.accepted_terms_at = DateTime.now.utc if !accepted_terms && accepted
    self.accepted_terms_at = nil if accepted_terms && !accepted
  end

  def accepted_terms
    accepted_terms_at.present?
  end

  # Returns wether or not the project is accepting new applications.
  def applications_open
    !["Won", "Lost"].include?(sales_status)
  end

  def deposit
    self[:deposit] || 0
  end

  def deposit_paid
    self[:deposit_paid] || 0
  end

  # returns the amount of the deposit that is left to be paid
  def deposit_owed
    [deposit - deposit_paid, 0].max
  end
end
