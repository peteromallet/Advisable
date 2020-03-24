# An OffPlatformProject represents a previous project that a freelancer completed off of Advisable.
# Currently we have the PreviousProject model to represent a previous project wether its on or
# off platform. Eventually we will rename OffPlatformProject to 'PreviousProject' and create
# records for on platform projects.
class OffPlatformProject < ApplicationRecord
  include Uid
  include Airtable::Syncable

  uid_prefix 'opp'
  belongs_to :specialist
  has_many :reviews, as: :project

  # Project skills
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills
  has_one :primary_project_skill,
          -> { where primary: true },
          as: :project, class_name: 'ProjectSkill'
  has_one :primary_skill, through: :primary_project_skill, source: :skill

  has_many :project_industries, as: :project
  has_many :industries, through: :project_industries

  scope :validated, -> { where(validation_status: 'Validated') }

  # Every time a project is created, updated or destroyed we want to update the
  # associated specialists project count.
  after_save :update_specialist_project_count
  after_destroy :update_specialist_project_count

  def contact_name
    "#{contact_first_name} #{contact_last_name}"
  end

  def contact_name=(name)
    self.contact_first_name = name.split(' ').try(:[], 0)
    self.contact_last_name = name.split(' ').try(:[], 1)
  end

  private

  # Update the associated specialists project count
  def update_specialist_project_count
    return unless specialist.present?
    specialist.update_project_count
  end
end
