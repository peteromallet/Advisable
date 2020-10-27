# Represents a client(company) application to the Advisable platform.
# The underlying object for a ClientApplicationType is a User object.
class Types::ClientApplicationType < Types::BaseType
  field :id, ID, null: false
  field :status, String, null: true
  field :first_name, String, null: false

  def first_name
    object.account.first_name
  end

  field :last_name, String, null: true

  def last_name
    object.account.last_name
  end

  field :company_name, String, null: true
  field :industry, Types::IndustryType, null: true
  field :budget, Int, null: true
  field :skills, [Types::Skill], null: true
  field :locality_importance, Int, null: true
  field :accepted_guarantee_terms, Boolean, null: true
  field :talent_quality, String, null: true
  field :rejection_reason, String, null: true
  field :company_type, String, null: true
  field :number_of_freelancers, String, null: true
  field :country, Types::CountryType, null: true

  def id
    object.uid
  end

  def status
    object.application_status.try(:upcase)
  end

  def accepted_guarantee_terms
    object.accepted_guarantee_terms_at.present?
  end

  def talent_quality
    object.talent_quality.try(:upcase)
  end

  def rejection_reason
    object.rejection_reason.try(:upcase)
  end
end
