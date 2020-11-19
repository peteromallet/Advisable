# An application record represents a freelancers (Specialist) association to
# a project. Similar to the Project model, the Application model was one of the
# first models added to the app and has since out grown it's name. Initially
# an application record was createid when a freelancer applied to a project.
# However, now an application record represents a freelancers assoiation to a
# project the entire way throughout the flow, even after they have been hired.
#
# Ideally this record would be broken down into separate models that represent
# different stages of the process of working with a freelancer.
#
# == Statuses
# The state of an application is represented by the 'status' column. This
# was setup to sync with Airtable and so the statuses are not normalied and are
# simply capitalized strings.
#
# [Invited To Apply] Indicates that a freelancer has been invited to apply to
# the project but has not yet applied.
#
# [Applied] When a freelacer has actually applied to a project.
#
# [Invitation Rejected] The freelancer has rejected the invitiation to apply
# to the projet. The reason for the rejection will be set in the
# invitation_rejection_reason collumn.
#
# [Application Rejected] The client has rejected a freelancers application.
# The reason for rejection will be provided in the rejection_reason and
# rejection_reason_comment columns.
#
# [Application Accepted] This is the first step of the hiring process. At this
# point the client will have sent an interview request to the freelancer.
#
# [Proposed] The freelancer has sent the client a proposal.
#
# [Working] The freelancer is actively working with the client. Check the
# associated 'tasks' to see the work being done.
#
# [Stopped Working] The freelancer is no longer working with the client. They
# may still resumt working with the freelancer, at which point the status will
# be set back to Working.
#
class Application < ApplicationRecord
  include Uid
  include Airtable::Syncable

  ACTIVE_STATUSES = ['Application Accepted', 'Interview Scheduled', 'Interview Completed', 'Proposed'].freeze
  HIRED_STATUSES = ['Working', 'Stopped Working'].freeze

  belongs_to :specialist
  belongs_to :project
  has_many :bookings, dependent: :destroy
  has_many :interviews, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_one :trial_task, -> { where(trial: true) }, class_name: "Task", inverse_of: :application
  # This previous project association represents a previous project that was created
  # from the application record after working with the client.
  has_one :previous_project, dependent: :destroy

  # references attached are previous projects that the specialist attaches to the application
  # during the application process.
  has_many :references, -> { where(project_type: "PreviousProject") }, class_name: "ApplicationReference", dependent: :destroy, inverse_of: :application
  has_many :previous_projects, through: :references, source: :project, source_type: "PreviousProject"
  has_one :interview, dependent: :destroy

  # Every time an application is created, updated or destroyed we want to:
  # - update the associated specialists average_score
  # - update the counts for the associated project
  after_destroy :update_specialist_average_score
  after_destroy :update_project_counts
  after_save :update_specialist_average_score
  after_save :update_project_counts, if: :saved_change_to_status?

  scope :applied, -> { where(status: 'Applied') }
  scope :high_score, -> { where('score > ?', 65) }
  # A candidate is only "matched" once its score is set above 65.
  scope :matched, -> { applied.high_score }
  scope :accepted, -> { where(status: 'Application Accepted') }
  scope :accepted_fees, -> { where(accepts_fee: true) }
  scope :accepted_terms, -> { where(accepts_terms: true) }
  scope :featured, -> { where(featured: true) }
  scope :rejected, -> { where(status: 'Application Rejected') }
  scope :proposed, -> { where(status: 'Proposed') }
  scope :hired, -> { where(status: HIRED_STATUSES) }
  scope :not_hidden, -> { where(hidden: [nil, false]) }
  scope :active, -> { where(status: ACTIVE_STATUSES) }

  # Filters a collection of application based on its associated projects sales status column.
  scope :by_sales_status, ->(status) { joins(:project).where(projects: {sales_status: status}) }

  # Filters out any applications that are in a final state.
  scope :not_final, -> { where.not(status: ['Working', 'Application Rejected', 'Invited To Apply', 'Invitation Rejected']) }

  # Returns the top 3 candidates
  scope :top_three_applied, -> { applied.where('score > ?', 65.0).order(score: :desc).limit(3) }

  # TODO: Part of airtable_id deprecation
  def self.find_by_uid_or_airtable_id(id)
    return find_by(uid: id) unless is_airtable_id(id)

    Raven.capture_message("#find_by_uid_or_airtable_id called on Application with an airtable id!", backtrace: caller, level: 'debug')
    find_by(airtable_id: id)
  end

  def self.find_by_uid_or_airtable_id!(id)
    find_by_uid_or_airtable_id(id) || raise(ActiveRecord::RecordNotFound)
  end

  def questions
    self[:questions] || []
  end

  # Returns the application rate as cents
  def invoice_rate
    return 0 if rate.nil?

    (rate * 100).ceil
  end

  def create_previous_project
    PreviousProject::ConvertApplication.run(self)
  end

  def referral_url
    "#{project.client_referral_url}&rid=#{specialist.uid}&referrer_firstname=#{specialist.account.first_name}&referrer_lastname=#{specialist.account.last_name}"
  end

  private

  def update_project_counts
    return unless project

    project.update_application_counts
  end

  def update_specialist_average_score
    return if specialist.blank?

    specialist.update(average_score: specialist.applications.average(:score))
  end
end

# == Schema Information
#
# Table name: applications
#
#  id                          :bigint           not null, primary key
#  accepts_fee                 :boolean
#  accepts_terms               :boolean
#  application_accepted_at     :datetime
#  application_rejected_at     :datetime
#  applied_at                  :datetime
#  auto_apply                  :boolean
#  availability                :string
#  comment                     :string
#  featured                    :boolean          default(FALSE)
#  hidden                      :boolean
#  hide_from_profile           :boolean
#  interview_completed_at      :datetime
#  interview_scheduled_at      :datetime
#  introduction                :text
#  invitation_rejected_at      :datetime
#  invitation_rejection_reason :string
#  invited_to_apply_at         :datetime
#  monthly_limit               :integer
#  project_type                :string
#  proposal_comment            :string
#  proposal_sent_at            :datetime
#  questions                   :jsonb
#  rate                        :decimal(, )
#  references_requested        :boolean
#  rejection_reason            :text
#  rejection_reason_comment    :text
#  score                       :decimal(, )
#  started_working_at          :datetime
#  status                      :string
#  stopped_working_at          :datetime
#  stopped_working_reason      :string
#  trial_program               :boolean
#  uid                         :string
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  airtable_id                 :string
#  project_id                  :bigint
#  rejection_reason_id         :bigint
#  specialist_id               :bigint
#
# Indexes
#
#  index_applications_on_project_id           (project_id)
#  index_applications_on_rejection_reason_id  (rejection_reason_id)
#  index_applications_on_specialist_id        (specialist_id)
#  index_applications_on_uid                  (uid)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (rejection_reason_id => application_rejection_reasons.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
