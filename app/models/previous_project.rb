# Represents a specialists previous project. Previous projects are only viewed
# within the context of an application.
class PreviousProject
  attr_reader :project, :application

  def initialize(project:, application:)
    @project = project
    @application = application
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

  def specialist
    application.specialist
  end

  class << self
    # Finds a specific previous project for a given appication_id.
    def find(id:, type:, application_id:)
      application = Application.find_by_airtable_id!(application_id)
      specialist = application.specialist
      project = if type == "OffPlatformProject"
        specialist.off_platform_projects.find_by_airtable_id!(id)
      else
        specialist_platform_projects(specialist: specialist)
          .find_by_airtable_id!(id)
      end
      new(application: application, project: project)
    end

    def for_application(application:)
      off_platform = specialist_off_platform_projects(specialist: application.specialist)
      platform_projects = specialist_platform_projects(specialist: application.specialist)
      (off_platform + platform_projects).map do |project|
        new(application: application, project: project)
      end
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