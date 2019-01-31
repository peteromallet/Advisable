class Types::OffPlatformProject < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :specialist, Types::SpecialistType, null: false
  field :industry, String, null: false
  field :contact_first_name, String, null: true
  field :contact_last_name, String, null: true
  field :contact_job_title, String, null: true
  field :client_name, String, null: true
  field :description, String, null: true
  field :client_description, String, null: true
  field :requirements, String, null: true
  field :results, String, null: true
  field :primary_skill, String, null: true
  field :confidential, Boolean, null: true
  field :reviews, [Types::Review], null: false
  field :skills, [String], null: false

  def id
    object.airtable_id
  end

  def client_name
    return nil if object.confidential
    object.client_name
  end

  def skills
    object.skills.map(&:name)
  end
end