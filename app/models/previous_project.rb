# PreviousProject represents a specialists relationship with a particular
# project. e.g A way to see all of the project reviews related specifically
# to that specialist.
# The project in a PreviousProject must be an instance of Project or
# OffPlatformProject.
class PreviousProject
  attr_reader :project, :specialist

  def initialize(project:, specialist:)
    @project = project
    @specialist = specialist
  end

  # We only want to show reviews that are related to the specialist
  def reviews
    @reviews ||= project.reviews.where(
      type: ["On-Platform Job Review", "Off-Platform Project Review"],
      specialist: specialist,
    )
  end

  class << self
    def find(id:, type:, specialist_id:)
      specialist = Specialist.find_by_airtable_id!(specialist_id)
      project = if type == "OffPlatformProject"
        specialist.off_platform_projects.find_by_airtable_id!(id)
      else
        specialist_platform_projects(specialist)
          .find_by_airtable_id!(id)
      end
      new(specialist: specialist, project: project)
    end

    # Returns an array of PreviousProject instances for a given specialist
    def for_specialist(specialist)
      off_platform = specialist.off_platform_projects

      on_platform = specialist_platform_projects(specialist)
      results = (off_platform + on_platform).map do |project|
        new(project: project, specialist: specialist)
      end

      results.sort_by do |previous_project|
        previous_project.project.created_at
      end.reverse
    end

    def for_application(application)
      results = application.references.map do |reference|
        new(project: reference.project, specialist: application.specialist)
      end

      results.sort_by do |previous_project|
        previous_project.project.created_at
      end.reverse
    end

    private

    # Returns the projects that specialist where their application has been
    # successful and has an associated booking with a status of either Complete
    # or Accepted
    def specialist_platform_projects(specialist)
      Project.joins(applications: [:specialist, :bookings])
        .where(
          specialists: { id: specialist.id },
          bookings: { status: ["Complete", "Accepted"] }
        )
    end
  end
end