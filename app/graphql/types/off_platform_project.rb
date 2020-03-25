# DEPRECATED: This type has been deprecated in favour of the Types::ProfileProjectType
class Types::OffPlatformProject < Types::BaseType
  field :id, ID, null: false
  field :uid, String, null: false
  field :airtable_id, String, null: false
  field :specialist, Types::SpecialistType, null: false
  field :industry, String, null: true
  field :contact_first_name, String, null: true
  field :contact_last_name, String, null: true
  field :contact_job_title, String, null: true
  field :contact_email, String, null: true
  field :client_name, String, null: true
  field :description, String, null: true
  field :client_description, String, null: true
  field :requirements, String, null: true
  field :results, String, null: true
  field :primary_skill, String, null: true
  field :confidential, Boolean, null: true
  field :reviews, [Types::Review], null: false
  field :skills, [String], null: false
  field :industries, [String], null: false
  field :validation_status, String, null: true
  field :goal, String, null: true

  def id
    object.airtable_id
  end

  def uid
    object.uid
  end

  def airtable_id
    object.airtable_id
  end

  # Only show the contact email if the validation status is in progress
  def contact_email
    return object.contact_email if object.validation_status == 'In Progress'
    nil
  end

  def client_name
    return "#{industry} Company" if object.confidential
    object.client_name
  end

  def industry
    object.primary_industry.try(:name) || object[:industry] ||
      industries.try(:first)
  end

  # Initially the primary_skill column was a text column and now it is an
  # association.
  def primary_skill
    object.primary_skill.try(:name) || object[:primary_skill] ||
      skills.try(:first)
  end

  def skills
    object.skills.map(&:name)
  end

  def industries
    object.industries.map(&:name)
  end
end
