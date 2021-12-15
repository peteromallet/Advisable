# frozen_string_literal: true

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
  include ::Airtable::Syncable
  include Uid
  include Project::Constants

  has_logidze

  has_many :applications, dependent: :destroy
  has_many :project_skills, as: :project, dependent: :destroy
  has_many :skills, through: :project_skills
  has_many :project_industries, as: :project, dependent: :destroy
  has_many :industries, through: :project_industries

  has_one :primary_project_skill, -> { where(primary: true) }, class_name: "ProjectSkill", as: :project, inverse_of: :project, dependent: :destroy
  has_one :primary_skill, through: :primary_project_skill, source: :skill

  belongs_to :user, optional: true

  validates :service_type, inclusion: {in: SERVICE_TYPES}, allow_nil: true
  validates :industry_experience_importance, inclusion: {in: [0, 1, 2, 3]}, allow_nil: true
  validates :location_importance, inclusion: {in: [0, 1, 2, 3]}, allow_nil: true
  validates :likely_to_hire, inclusion: {in: [0, 1, 2, 3]}, allow_nil: true

  after_update :send_paused_emails, if: -> { saved_change_to_sales_status? && sales_status == "Paused" }

  def nice_name
    name.presence || primary_skill&.name
  end

  def accepted_terms=(accepted)
    self.accepted_terms_at = Time.zone.now if !accepted_terms && accepted
    self.accepted_terms_at = nil if accepted_terms && !accepted
  end

  def accepted_terms
    accepted_terms_at.present?
  end

  # Returns whether or not the project is accepting new applications.
  def applications_open
    %w[Won Lost].exclude?(sales_status)
  end

  %i[deposit deposit_paid deposit_used].each do |m|
    define_method m do
      super().presence || 0
    end
  end

  # returns the amount of the deposit that is left to be paid
  def deposit_owed
    [deposit - deposit_paid, 0].max
  end

  def deposit_is_paid?
    deposit == deposit_paid
  end

  def deposit_remaining
    deposit - deposit_used
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

  def assisted?
    service_type == "Assisted"
  end

  # Returns an array of applications that are in the 'hiring pipeline' stages.
  def candidates
    query = applications.not_hidden
    query = query.active.or(query.matched)
    query.order(score: :desc)
  end

  # Updates all of the various application counters
  def update_application_counts
    self.candidate_count = applications.active.count
    self.proposed_count = applications.proposed.count
    self.hired_count = applications.hired.count
    save(valiate: false, touch: false)
  end

  # This is called after a client accepts or rejects a match to determin if the
  # sourcing attribute should be updated from true to false.
  def update_sourcing
    return if sourcing == false
    # If there is still matches left then dont do anything.
    return if applications.matched.any?

    accepted = applications.accepted.any?
    update(sourcing: false) if accepted
  end

  # we are moving the company type data from the project to the user
  # record so first check for it there before falling back to the project.
  def company_type
    user.company&.try(:kind) || self[:company_type]
  end

  # we are moving the industry data from the project to the user
  # record so first check for it there before falling back to the project.
  def industry
    user.company&.industry&.name || self[:industry]
  end

  def deposit_payment_intent
    @deposit_payment_intent ||= Stripe::PaymentIntent.create(
      {
        currency: "usd",
        amount: deposit_owed,
        customer: user.company.stripe_customer_id,
        setup_future_usage: "off_session",
        metadata: {payment_type: "deposit", project: uid}
      },
      {idempotency_key: "deposit_#{deposit_owed}_#{uid}"}
    )
  end

  def sales_person
    Sentry.capture_message("#sales_person called on Project that was meant for Company", level: "debug")
    user.company.sales_person
  end

  def owner
    Sentry.capture_message("#owner called on Project that was meant for Company", level: "debug")
    user.company.sales_person.username
  end

  private

  def send_paused_emails
    applications.where(status: Application::ACTIVE_STATUSES + ["Applied"]).find_each do |application|
      SpecialistMailer.project_paused(self, application).deliver_later
    end
  end
end

# == Schema Information
#
# Table name: projects
#
#  id                               :integer          not null, primary key
#  name                             :string
#  airtable_id                      :string
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#  currency                         :string
#  client_referral_url              :string
#  company_description              :text
#  description                      :text
#  specialist_description           :text
#  goals                            :text             default("{}"), is an Array
#  questions                        :text             default("{}"), is an Array
#  required_characteristics         :text             default("{}"), is an Array
#  characteristics                  :text             default("{}"), is an Array
#  accepted_terms_at                :datetime
#  deposit                          :integer
#  status                           :string
#  deposit_paid                     :integer
#  user_id                          :integer
#  service_type                     :string
#  estimated_budget                 :string
#  remote                           :boolean
#  sales_status                     :string
#  deposit_payment_intent_id        :string
#  campaign_source                  :string
#  brief_pending_confirmation_at    :datetime
#  brief_confirmed_at               :datetime
#  interview_scheduled_at           :datetime
#  call_scheduled_at                :datetime
#  candidate_proposed_at            :datetime
#  candidate_accepted_at            :datetime
#  interview_completed_at           :datetime
#  booking_request_sent_at          :datetime
#  booking_confirmed_at             :datetime
#  proposal_received_at             :datetime
#  won_at                           :datetime
#  lost_at                          :datetime
#  campaign_name                    :string
#  uid                              :string           not null
#  industry                         :string
#  company_type                     :string
#  industry_experience_required     :boolean
#  company_type_experience_required :boolean
#  industry_experience_importance   :integer
#  location_importance              :integer
#  likely_to_hire                   :integer
#  candidate_count                  :integer          default("0")
#  proposed_count                   :integer          default("0")
#  hired_count                      :integer          default("0")
#  sourcing                         :boolean
#  linkedin_campaign_id             :integer
#  published_at                     :datetime
#  deposit_used                     :integer
#  stop_candidate_proposed_emails   :boolean
#  level_of_expertise_required      :string
#  likelihood_to_confirm            :integer
#  lost_reason                      :string
#  project_start                    :string
#
# Indexes
#
#  index_projects_on_sales_status  (sales_status)
#  index_projects_on_uid           (uid) UNIQUE
#  index_projects_on_user_id       (user_id)
#
