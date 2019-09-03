class Application < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :project
  has_many :bookings
  has_many :interviews
  has_many :tasks
  has_many :references, class_name: 'ApplicationReference'
  has_one :interview

  scope :accepted_fees, -> { where(accepts_fee: true) }
  scope :accepted_terms, -> { where(accepts_terms: true) }
  scope :featured, -> { where(featured: true) }
  scope :rejected, -> { where(status: "Application Rejected") }
  scope :not_hidden, -> { where(hidden: [nil, false]) }

  # Filters a collection of application based on its associated projects
  # sales status column.
  scope :by_sales_status, -> (status) {
    joins(:project).where(projects: { sales_status: status })
  }

  # Filters out any applications that are in a final state.
  scope :not_final, -> {
    where.not(
      status: [
        'Working',
        'Application Rejected',
        'Invited To Apply',
        'Invitation Rejected'
      ]
    )
  }

  # Returns the top 3 candidates
  scope :top_three, -> {
    where("score > ?", 65.0).order(score: :desc).limit(3)
  }

  def questions
    self[:questions] || []
  end
end
