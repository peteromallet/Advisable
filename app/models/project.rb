# A project is essentially a job posting. When a client (user) wants to hire
# a freelancer, they create a new project that details what kind of freelancer
# they are looking to hire. This model was one of the first models introduced
# to the app and overtime has grown quite a lot. Even though we still use the
# term 'project' it is best to think of it as a 'job' listing.
#
# Freelancers (specialists) are associated to projects via an 'Application'
# record. See the app/modals/application.rb for more details.
#
class Project < ApplicationRecord
  include Uid
  include StatusMap
  include Airtable::Syncable
  has_many :applications
  has_many :bookings, through: :applications
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills

  has_one :primary_project_skill,
          -> { where(primary: true) },
          class_name: 'ProjectSkill', as: :project

  has_one :primary_skill, through: :primary_project_skill, source: :skill

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

  map_status status: {
               draft: 'Draft', pending_review: 'Pending Advisable Confirmation'
             }

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

  # Updates all of the various application counters
  def update_application_counts
    self.candidate_count = applications.active.count
    self.proposed_count = applications.proposed.count
    self.hired_count = applications.hired.count
    save(valiate: false, touch: false)
  end
end
