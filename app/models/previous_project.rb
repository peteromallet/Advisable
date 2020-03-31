class PreviousProject < ApplicationRecord
  include Uid
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

  # def initialize(project:, specialist:)
  #   @project = project
  #   @specialist = specialist
  # end

  # # We only want to show reviews that are related to the specialist
  # def reviews
  #   @reviews ||=
  #     project.reviews.where(
  #       type: ['On-Platform Job Review', 'Off-Platform Project Review'],
  #       specialist: specialist
  #     )
  # end

  # class << self
  #   def find(id:, type:, specialist_id:)
  #     specialist = Specialist.find_by_airtable_id!(specialist_id)
  #     project =
  #       if type == 'OffPlatformProject'
  #         specialist.off_platform_projects.find_by_airtable_id!(id)
  #       else
  #         specialist_platform_projects(specialist).find_by_airtable_id!(id)
  #       end
  #     new(specialist: specialist, project: project)
  #   end

  #   # Returns an array of PreviousProject instances for a given specialist
  #   def for_specialist(specialist, opts = {})
  #     off_platform = specialist.off_platform_projects

  #     # Filter out any off platform projects that have failed validation unless
  #     # we have specified to include them
  #     unless opts.fetch(:include_validation_failed, false)
  #       off_platform =
  #         off_platform.where.not(validation_status: 'Validation Failed')
  #     end

  #     if opts.fetch(:exclude_hidden_from_profile, false)
  #       off_platform = off_platform.where(hide_from_profile: [false, nil])
  #     end

  #     on_platform =
  #       specialist_platform_projects(
  #         specialist,
  #         {
  #           exclude_hidden_from_profile:
  #             opts.fetch(:exclude_hidden_from_profile, false)
  #         }
  #       )

  #     results =
  #       (off_platform + on_platform).map do |project|
  #         new(project: project, specialist: specialist)
  #       end

  #     results.sort_by do |previous_project|
  #       previous_project.project.created_at
  #     end.reverse
  #   end

  #   def for_application(application, opts = {})
  #     results =
  #       application.references.map do |reference|
  #         new(project: reference.project, specialist: application.specialist)
  #       end

  #     # Filter out any off platform projects that have failed validation unless
  #     # we have specified to include them
  #     unless opts.fetch(:include_validation_failed, false)
  #       results =
  #         results.select do |reference|
  #           if reference.project.is_a?(OffPlatformProject)
  #             next reference.project.validation_status != 'Validation Failed'
  #           end

  #           true
  #         end
  #     end

  #     results.sort_by do |previous_project|
  #       previous_project.project.created_at
  #     end.reverse
  #   end

  #   private

  #   # Returns the projects that specialist where their application has been
  #   # successful and has an associated booking with a status of either Complete
  #   # or Accepted
  #   def specialist_platform_projects(specialist, opts = {})
  #     projects =
  #       Project.joins(applications: %i[specialist]).where(
  #         applications: {
  #           status: ['Working', 'Stopped Working'],
  #           specialists: { id: specialist.id }
  #         }
  #       )

  #     if opts.fetch(:exclude_hidden_from_profile, false)
  #       projects =
  #         projects.where(
  #           applications: {
  #             hide_from_profile: [false, nil],
  #             specialists: { id: specialist.id }
  #           }
  #         )
  #     end

  #     projects
  #   end
  # end
end
