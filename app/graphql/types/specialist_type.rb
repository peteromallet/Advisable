class Types::SpecialistType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :name, String, null: true
  field :city, String, null: true
  field :bio, String, null: true
  field :confirmed, Boolean, null: false
  field :travel_availability, String, null: true
  field :linkedin, String, null: true
  field :phone_number, String, null: true
  field :image, Types::AttachmentType, null: true
  field :skills, [String, null: true], null: true
  field :ratings, Types::Ratings, null: false
  field :reviews, [Types::Review], null: false
  field :reviewsCount, Integer, null: true
  field :remote, Boolean, null: true
  field :previous_projects, [Types::PreviousProject], null: false
  field :has_account, Boolean, null: false

  field :completed_tutorials, [String], null: false do
    authorize :is_specialist
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    authorize :is_specialist
  end

  field :applications, [Types::ApplicationType], null: true do
    authorize :is_specialist
    argument :status, [String], required: false
  end

  field :email, String, null: true do
    authorize :is_admin, :is_specialist, :is_applicant_of_user_project
  end

  field :talk_signature, String, null: false do
    authorize :is_specialist
  end

  field :country, Types::CountryType, null: true

  # The specialist country is an association to a record in the countries table,
  # however, the CountryType expects an object from the 'countries' gem. We
  # use the records name to retrieve this.
  def country
    return nil unless object.country.present?
    ISO3166::Country.find_country_by_name(object.country.name)
  end

  def id
    object.uid
  end

  def talk_signature
    user_id = context[:current_user].uid
    OpenSSL::HMAC.hexdigest('SHA256', ENV["TALKJS_SECRET"], user_id)
  end

  def name
    "#{object.first_name} #{object.last_name}"
  end

  def skills
    object.skills.map(&:name)
  end

  def previous_projects
    ::PreviousProject.for_specialist(object)
  end

  def has_account
    object.has_account?
  end

  def applications(status: nil)
    applications = object.applications.order(created_at: :desc)
    applications = applications.where(status: status) if status.present?
    applications
  end
end
