class Types::ProjectType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :primary_skill, String, null: true
  field :currency, String, null: true
  field :status, String, null: true
  field :service_type, String, null: true
  field :clientReferralUrl, String, null: true
  field :user, Types::User, null: true
  field :goals, [String], null: true
  field :description, String, null: true
  field :company_description, String, null: true
  field :specialist_description, String, null: true
  field :questions, [String], null: true
  field :required_characteristics, [String], null: true
  field :optional_characteristics, [String], null: true
  field :accepted_terms, Boolean, null: false
  field :deposit_owed, Int, null: true
  field :application_count, Int, null: false
  field :estimated_budget, String, null: true
  field :remote, Boolean, null: true

  field :applications, [Types::ApplicationType, null: true], null: true do
    argument :status, [String], required: false
  end

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  def applications(**args)
    applications = object.applications.order(score: :desc)
    applications = applications.where(status: args[:status]) if args[:status]
    applications
  end

  def application(**args)
    by_airtable = object.applications.find_by_airtable_id(args[:id])
    return by_airtable if by_airtable
    object.applications.find(args[:id])
  end

  def goals
    object.goals || []
  end

  def required_characteristics
    object.required_characteristics || []
  end

  def optional_characteristics
    object.optional_characteristics || []
  end

  def questions
    object.questions || []
  end
end