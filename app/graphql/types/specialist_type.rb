class Types::SpecialistType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :name, String, null: true
  field :city, String, null: true
  field :country, Types::CountryType, null: true
  field :travel_availability, String, null: true
  field :linkedin, String, null: true
  field :phone_number, String, null: true
  field :image, Types::AttachmentType, null: true
  field :skills, [String, null: true], null: true
  field :ratings, Types::Ratings, null: false
  field :previous_projects, [Types::PreviousProject], null: true
  field :reviews, [Types::Review], null: false
  field :reviewsCount, Integer, null: true

  def name
    "#{object.first_name} #{object.last_name}"
  end

  def skills
    object.skills.map(&:name)
  end

  # The specialists previous projects is a collection of their off-platform
  # projects and the projects that they were successfully hired onto.
  def previous_projects
    off_platform_projects + platform_projects
  end

  def off_platform_projects
    object.off_platform_projects.validated
  end

  # Returns the projects that specialist where their application has been
  # successful and has an associated booking with a status of either Complete
  # or Accepted
  def platform_projects
    object
      .projects.joins(applications: :bookings)
      .where(applications: { bookings: { status: ["Complete", "Accepted"] } })
  end
end
