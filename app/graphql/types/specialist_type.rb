class Types::SpecialistType < Types::BaseType
  description <<~HEREDOC
    Represents a freelancer. The Specialist type is also a type of viewer. It
    will be returned for the viewer query when the freelancer is logged in.
  HEREDOC

  field :id, ID, null: false do
    description "The unique ID for the specialist"
  end

  def id
    object.uid
  end

  field :airtable_id, String, null: false do
    description "The airtable ID for the specialist"
  end

  field :first_name, String, null: true do
    description "The specialists first name"
  end

  field :last_name, String, null: true do
    description "The specialists last name"
  end

  field :name, String, null: true do
    description "The specailists full name"
  end

  def name
    "#{object.first_name} #{object.last_name}"
  end

  field :city, String, null: true do
    description "The specialists city"
  end

  field :bio, String, null: true do
    description <<~HEREDOC
      A short bio text for the specialist. This is used to prefill the intro
      text when applying for applications.
    HEREDOC
  end

  field :confirmed, Boolean, null: false do
    description "Wether or not the specialists account has been confirmed"
  end

  field :travel_availability, String, null: true do
    description "Wether or not the specailist is willing to travel for work"
  end

  field :linkedin, String, null: true do
    description "The specialists linkedin URL"
  end

  field :website, String, null: true do
    description "The specialists portfolio"
  end

  field :phone_number, String, null: true do
    description "The phone number for the specialist"
  end

  field :image, Types::AttachmentType, null: true do
    description "The specialists profile image"
  end

  field :resume, Types::AttachmentType, null: true do
    description "The specialists resume"
  end

  def resume
    object.resume.attached? ? object.resume : nil
  end

  field :avatar, String, null: true do
    description "The specialists avatar"
  end

  def avatar
    return unless object.avatar.attached?
    Rails.application.routes.url_helpers.rails_blob_url(object.avatar, host: ENV["ORIGIN"])
  end

  field :skills, [String, null: true], null: true do
    description "A list of skills that the specialist possesses"
  end

  def skills
    object.skills.map(&:name)
  end

  field :ratings, Types::Ratings, null: false do
    description "The combined ratings for the specialist based on previous work"
  end

  # Eventually the reviews and reviewsCount fields should be combined into
  # some kind of Connection type to support pagination and where the count
  # would be a field of the connection type.
  field :reviews, [Types::Review], null: false do
    description "A list of reviews for the specialist"
  end

  field :reviewsCount, Integer, null: true do
    description "The amount of reviews a specialist has"
  end

  field :remote, Boolean, null: true do
    description "Wether or not the specialist will work remotely"
  end

  field :previous_projects, [Types::PreviousProject], null: false do
    description <<~HEREDOC
      list of the specialists previous projects. These can either be projects
      that happened on Advisable or off platform projects that the specialist
      has provided.
    HEREDOC
  end

  def previous_projects
    ::PreviousProject.for_specialist(object)
  end

  field :has_account, Boolean, null: false do
    description "Wether or not the specialist has created their account yet"
  end

  def has_account
    object.has_account?
  end

  field :completed_tutorials, [String], null: false do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      An array of tutorial ID's that the user has completed. This is used to
      track when to show onboarding flows for certain features.
    HEREDOC
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    authorize :is_specialist, :is_admin
    description "The timestamp for when the specialist record was created"
  end

  # Eventually the applications field should be updated to support pagination
  # using a connection type. By default we use the 'by_sales_status' scope
  # to only fetch applications where the associated project sales_status is
  # "Open"
  field :applications, [Types::ApplicationType], null: true do
    authorize :is_specialist, :is_admin
    argument :status, [String], required: false
    argument :sales_status, [String], required: false
    description <<~HEREDOC
      The specialists applications. This can be filtered by passing an array of
      statuses.
    HEREDOC
  end

  def applications(status: nil, sales_status: nil)
    applications = object.applications.order(created_at: :desc)
    applications = applications.by_sales_status(sales_status) if sales_status.present?
    applications = applications.where(status: status) if status.present?
    applications
  end

  field :email, String, null: true do
    authorize :is_admin, :is_specialist, :is_applicant_of_user_project
    description "The specialists email address"
  end
  
  field :talk_signature, String, null: false do
    authorize :is_specialist
    description "A unique signature used to for identification with talkjs"
  end
  
  def talk_signature
    user_id = context[:current_user].uid
    OpenSSL::HMAC.hexdigest('SHA256', ENV["TALKJS_SECRET"], user_id)
  end

  field :country, Types::CountryType, null: true do
    description "The specialists country"
  end

  # The specialist country is an association to a record in the countries table,
  # however, the CountryType expects an object from the 'countries' gem. We
  # use the records name to retrieve this.
  def country
    return nil unless object.country.present?
    ISO3166::Country.find_country_by_name(object.country.name)
  end

  field :has_setup_payments, Boolean, null: true do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      Wether or not the specialist has provided their bank information so that
      they can be paid.
    HEREDOC
  end

  field :bank_holder_name, String, null: true do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      The full name or company name of the bank account holder.
    HEREDOC
  end

  field :bank_holder_address, Types::AddressType, null: true do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      The address of the bank accound holder.
    HEREDOC
  end

  field :bank_currency, String, null: true do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      The currency of the specialists bank account.
    HEREDOC
  end

  field :vat_number, String, null: true do
    authorize :is_specialist, :is_admin
    description <<~HEREDOC
      The specialists VAT number
    HEREDOC
  end

  field :primarily_freelance, Boolean, null: true do
    description "Wether or not the freelancers occupation is primarily freelancing"
  end

  field :number_of_projects, String, null: true do
    description "The number of projects the freelancer has completed"
  end

  field :hourly_rate, Int, null: true do
    description "The typical hourly rate for this freelancer"
  end

  field :public_use, Boolean, null: false do
    description "Wether or not the specialist is ok with being used publicly"
  end
end
