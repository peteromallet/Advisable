class Project < ApplicationRecord
  include Uid
  include Airtable::Syncable
  has_many :applications
  has_many :bookings, through: :applications
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills
  has_many :project_industries, as: :project
  has_many :industries, through: :project_industries
  validates :service_type,
            inclusion: { in: %w[Assisted Self-Service Consultation] },
            allow_nil: true

  validates :industry_experience_importance,
            inclusion: { in: [0, 1, 2, 3] }, allow_nil: true

  validates :location_importance,
            inclusion: { in: [0, 1, 2, 3] }, allow_nil: true

  validates :likely_to_hire, inclusion: { in: [0, 1, 2, 3] }, allow_nil: true

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
    !%w[Won Lost].include?(sales_status)
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

  def characteristics
    self[:characteristics] || []
  end

  def required_characteristics
    self[:required_characteristics] || []
  end

  def optional_characteristics
    characteristics - required_characteristics
  end

  # Returns an array of applications that are in the 'hiring pipeline' stages.
  # This includes any candidates that are not in a pre invite stage or working
  # stage as well as the top 3 candidates in the applied stage.
  def candidates
    base = applications.not_hidden

    applied = base.top_three_applied
    beyond_applied =
      base.where(
        status: [
          'Application Accepted',
          'Application Rejected',
          'Interview Scheduled',
          'Interview Completed',
          'Proposed'
        ]
      )

    (applied + beyond_applied).uniq
  end
end
