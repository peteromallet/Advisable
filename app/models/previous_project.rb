class PreviousProject < ApplicationRecord
  include Uid
  include Airtable::Syncable
  self.table_name = 'off_platform_projects'

  belongs_to :specialist
  belongs_to :application, required: false

  has_many :reviews, as: :project

  # Project skills
  has_many :project_skills, as: :project, dependent: :destroy
  has_many :skills, through: :project_skills
  has_one :primary_project_skill,
          -> { where primary: true },
          as: :project, class_name: 'ProjectSkill'
  has_one :primary_skill, through: :primary_project_skill, source: :skill

  # Project industries
  has_many :project_industries, as: :project, dependent: :destroy
  has_many :industries, through: :project_industries
  has_one :primary_project_industry,
          -> { where primary: true },
          as: :project, class_name: 'ProjectIndustry'
  has_one :primary_industry,
          through: :primary_project_industry, source: :industry

  # Scopes
  scope :validated, -> { where(validation_status: 'Validated') }
  scope :validation_not_failed, -> { where.not(validation_status: 'Failed') }
  scope :on_platform, -> { where.not(application_id: nil) }
  scope :not_hidden, -> { where(hide_from_profile: [nil, false]) }

  # Every time a project is created, updated or destroyed we want to update the
  # associated specialists project count.
  after_save :update_specialist_project_count
  after_destroy :update_specialist_project_count

  def on_platform?
    application_id.present?
  end

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
