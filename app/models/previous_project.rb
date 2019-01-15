# Represents a previous project for a specialist. The project must be an
# instance of either Project or OffPlatformProject
class PreviousProject
  attr_reader :project, :specialist

  def initialize(project:, specialist:)
    @project = project
    @specialist = specialist
  end

  def title
    project.primary_skill
  end

  def description
    project.description
  end

  def company_name
    return project.user.company_name if project.is_a?(Project)
    return "#{project.industry} Company" if project.confidential
    project.client_name
  end

  def client_description
    return project.company_description if project.is_a?(Project)
    project.client_description
  end

  def requirements
    return project.specialist_description if project.is_a?(Project)
    project.requirements
  end

  def results
    return nil if project.is_a?(Project)
    project.results
  end

  def reviews
    @reviews ||= project.reviews.where(
      type: ["On-Platform Job Review", "Off-Platform Project Review"],
      specialist: specialist,
    )
  end

  class << self
    # Finds a specific previous project for a given specialist id.
    def find(id:, type:, specialist_id:)
      specialist = Specialist.find_by_airtable_id!(specialist_id)
      project = if type == "OffPlatformProject"
        specialist.off_platform_projects.find_by_airtable_id!(id)
      else
        specialist_platform_projects(specialist: specialist)
          .find_by_airtable_id!(id)
      end
      new(specialist: specialist, project: project)
    end

    # Returns an array of previous projects for a specialist. This contains
    # both off-platform an on-platform projects
    def for_specialist(specialist:)
      off_platform = specialist_off_platform_projects(specialist: specialist)
      platform_projects = specialist_platform_projects(specialist: specialist)
      (off_platform + platform_projects).map do |project|
        new(specialist: specialist, project: project)
      end
    end

    def for_application(application:)
      for_specialist(specialist: application.specialist)
    end

    private

    def specialist_off_platform_projects(specialist:)
      specialist.off_platform_projects.validated
    end

    # Returns the projects that specialist where their application has been
    # successful and has an associated booking with a status of either Complete
    # or Accepted
    def specialist_platform_projects(specialist:)
      Project.joins(applications: [:specialist, :bookings])
        .where(
          specialists: { id: specialist.id },
          bookings: { status: ["Complete", "Accepted"] }
        )
    end
  end
end