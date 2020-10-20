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
            inclusion: {in: %w[Assisted Self-Service Consultation]},
            allow_nil: true

  validates :industry_experience_importance,
            inclusion: {in: [0, 1, 2, 3]}, allow_nil: true

  validates :location_importance,
            inclusion: {in: [0, 1, 2, 3]}, allow_nil: true

  validates :likely_to_hire, inclusion: {in: [0, 1, 2, 3]}, allow_nil: true

  belongs_to :user, required: false
  belongs_to :sales_person, required: false

  map_status status: {
               draft: 'Draft', pending_review: 'Pending Advisable Confirmation'
             }

  def accepted_terms=(accepted)
    self.accepted_terms_at = Time.zone.now if !accepted_terms && accepted
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

  def characteristics=(values)
    self[:characteristics] = values
    required_characteristics.filter! do |c|
      values.include?(c)
    end
  end

  def required_characteristics
    self[:required_characteristics] || []
  end

  def optional_characteristics
    characteristics - required_characteristics
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
    user&.try(:company_type) || self[:company_type]
  end

  # we are moving the industry data from the project to the user
  # record so first check for it there before falling back to the project.
  def industry
    user&.industry&.name || self[:industry]
  end
end

# == Schema Information
#
# Table name: projects
#
#  id                               :bigint           not null, primary key
#  accepted_terms_at                :datetime
#  booking_confirmed_at             :datetime
#  booking_request_sent_at          :datetime
#  brief_confirmed_at               :datetime
#  brief_pending_confirmation_at    :datetime
#  call_scheduled_at                :datetime
#  campaign_name                    :string
#  campaign_source                  :string
#  candidate_accepted_at            :datetime
#  candidate_count                  :integer          default(0)
#  candidate_proposed_at            :datetime
#  characteristics                  :text             default([]), is an Array
#  client_referral_url              :string
#  company_description              :text
#  company_type                     :string
#  company_type_experience_required :boolean
#  currency                         :string
#  deposit                          :integer
#  deposit_paid                     :integer
#  description                      :text
#  estimated_budget                 :string
#  goals                            :text             default([]), is an Array
#  hired_count                      :integer          default(0)
#  industry                         :string
#  industry_experience_importance   :integer
#  industry_experience_required     :boolean
#  interview_completed_at           :datetime
#  interview_scheduled_at           :datetime
#  likely_to_hire                   :integer
#  location_importance              :integer
#  lost_at                          :datetime
#  name                             :string
#  owner                            :string
#  primary_skill                    :string
#  proposal_received_at             :datetime
#  proposed_count                   :integer          default(0)
#  questions                        :text             default([]), is an Array
#  remote                           :boolean
#  required_characteristics         :text             default([]), is an Array
#  sales_status                     :string
#  service_type                     :string
#  sourcing                         :boolean
#  specialist_description           :text
#  status                           :string
#  uid                              :string
#  won_at                           :datetime
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#  airtable_id                      :string
#  client_id                        :bigint
#  deposit_payment_intent_id        :string
#  linkedin_campaign_id             :bigint
#  sales_person_id                  :bigint
#  user_id                          :bigint
#
# Indexes
#
#  index_projects_on_client_id        (client_id)
#  index_projects_on_sales_person_id  (sales_person_id)
#  index_projects_on_user_id          (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (client_id => clients.id)
#  fk_rails_...  (sales_person_id => sales_people.id)
#  fk_rails_...  (user_id => users.id)
#
