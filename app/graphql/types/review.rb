class Types::Review < Types::BaseType
  field :id, ID, null: false
  field :comment, String, null: false
  field :type, String, null: true
  field :ratings, Types::Ratings, null: false
  field :name, String, null: true
  field :role, String, null: true
  field :specialist, Types::SpecialistType, null: false

  def id
    object.airtable_id
  end

  def name
    return object.project.user.name if object.project.is_a?(Project)
    object.project.contact_name
  end

  def role
    return object.project.user.title if object.project.is_a?(Project)
    object.project.contact_job_title
  end
end
