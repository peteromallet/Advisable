class Types::QueryType < GraphQL::Schema::Object

  field :project, Types::ProjectType, description: "Find a Project by ID", null: true do
    argument :id, ID, required: true
  end

  def project(**args)
    begin
      Project.find_by_airtable_id!(args[:id])
    rescue ActiveRecord::RecordNotFound => er
      GraphQL::ExecutionError.new("Could not find project #{args[:id]}")
    end
  end

  field :application_rejection_reasons, [Types::ApplicationRejectionReasonType, null: true], null: true

  def application_rejection_reasons
    ::ApplicationRejectionReason.all
  end

  field :booking_rejection_reasons, [Types::BookingRejectionReason, null: true], null: true

  def booking_rejection_reasons
    ::BookingRejectionReason.all
  end

  field :booking, Types::Booking, description: "Find a booking by ID", null: true do
    argument :id, ID, required: true
  end

  def booking(id: )
    begin
      ::Booking.find_by_airtable_id(id)
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find booking #{id}")
    end
  end

  field :application, Types::ApplicationType, description: "Get an application record by its airtable ID", null: true do
    argument :id, ID, required: true
  end

  def application(id: )
    begin
      ::Application.find_by_airtable_id(id)
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find booking #{id}")
    end
  end

  field :interview, Types::Interview, description: "Fetch an interview record by its airtable ID", null: true do
    argument :id, ID, required: true
  end

  def interview(id: )
    begin
      ::Interview.find_by_airtable_id(id)
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find interview #{id}")
    end
  end

  field :user, Types::User, description: "Fetch a user record by its airtable ID", null: true do
    argument :id, ID, required: true
  end

  def user(id: )
    begin
      ::User.find_by_airtable_id(id)
    rescue Airrecord::Error => er
      GraphQL::ExecutionError.new("Could not find user #{id}")
    end
  end

  field :payment, Types::Payment, "Fetch a payment record by its uid", null: true do
    argument :id, ID, required: true
  end

  def payment(id: )
    Payment.find_by_uid(id)
  end

  field :viewer, Types::User, "Get the current user", null: true

  def viewer
    context[:current_user]
  end

  field :countries, [Types::CountryType], "Return the list of countries", null: false

  def countries
    Country.all
  end

  field :skills, [Types::Skill], "Returns a list of skills", null: false do
    argument :category, String, required: false
    argument :profile, Boolean, required: false
  end
 
  def skills(**args)
    skills = ::Skill.all
    skills = skills.where(category: args[:category]) if args[:category]
    skills = skills.where(profile: args[:profile]) if args[:profile]
    skills
  end
end
