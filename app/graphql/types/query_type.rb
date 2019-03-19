class Types::QueryType < Types::BaseType
  field :project, Types::ProjectType, description: "Find a Project by ID", null: true do
    argument :id, ID, required: true
  end

  # querying for a project requires a special case where the user
  # will face one of three scenrios:
  # 1. The user is not logged in and the client associated to the project
  # has not yet created an account. In this case we want to return an error
  # code of signupRequired. The user email will be included in this error
  # as an extension.
  # 2. The user is not logged in and the client has an account. In this case
  # we need to inform the user to redirect to the login page with an error
  # code of notAuthenticated
  # 3. The user is logged in but does not have access to the project. In this
  # case we dont need to return any error. The autorization logic will return
  # nil for the project.
  # The corresponding frontend code for these cases can be found in
  # /views/Project/index.js
  def project(**args)
    project = Project.find_by_airtable_id!(args[:id])
    policy = ProjectPolicy.new(context[:current_user], project)
    # Return the project if the user has access to it.
    return project if policy.can_access_project?
    # If there is a user logged in but they don't have access then return nil
    return nil if context[:current_user]
    # Returns special error codes if there is no user logged in.
    user = project.user
    email = user.try(:email)
    has_account = user.try(:has_account?)
    code = has_account ? "authenticationRequired" : "signupRequired"
    url = has_account ? "/login" : "/signup/#{user.try(:airtable_id)}"
    extensions = {
      redirect: url,
      email: email
    } 
    raise GraphQL::ExecutionError.new(code, extensions: extensions)
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
      GraphQL::ExecutionError.new("Could not find application #{id}")
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

  field :viewer, Types::ViewerUnion, "Get the current viewer", null: true

  def viewer
    context[:current_user]
  end

  field :countries, [Types::CountryType], "Return the list of countries", null: false

  def countries
    Country.all.order(name: :asc)
  end

  field :skills, [Types::Skill], "Returns a list of skills", null: false
 
  def skills
    Rails.cache.fetch("airtable_active_skills", expires_in: 2.minutes) do
      Airtable::Skill.active.map do |s|
        OpenStruct.new(airtable_id: s.id, name: s.fields["Name"])
      end
    end
  end

  field :previous_project, Types::PreviousProject, null: false do
    argument :id, ID, required: true
    argument :type, Types::PreviousProjectTypeAttribute, required: true
    argument :specialist_id, ID, required: true
  end

  def previous_project(id:, type:, specialist_id:)
    ::PreviousProject.find(id: id, type: type, specialist_id: specialist_id)
  end

  field :specialist, Types::SpecialistType, null: true do
    argument :id, ID, required: true
  end

  def specialist(id: )
    Specialist.find_by_airtable_id!(id)
  end

  field :industries, [Types::IndustryType], null: false

  def industries
    Industry.all.order(name: :asc)
  end
end
