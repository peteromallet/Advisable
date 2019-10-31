class Application < ApplicationRecord
  include Uid
  include Airtable::Syncable
  belongs_to :specialist
  belongs_to :project
  has_many :bookings
  has_many :interviews
  has_many :tasks
  has_one :trial_task, -> { where(trial: true) }, class_name: "Task"
  has_many :references, class_name: 'ApplicationReference'
  has_one :interview

  # Every time an application is created, updated or destroyed we want to update
  # the associated specialists project count.
  after_save :update_specialist_project_count
  after_destroy :update_specialist_project_count

  # Every time an application is created, updated or destroyed we want to update
  # the assoicated specialists average_score.
  after_save :update_specialist_average_score
  after_destroy :update_specialist_average_score

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

  private

  # Update the associated specialists project count
  def update_specialist_project_count
    return unless specialist.present?
    specialist.update_project_count
  end

  def update_specialist_average_score
    return unless specialist.present?
    specialist.update(average_score: specialist.applications.average(:score))
  end
end
