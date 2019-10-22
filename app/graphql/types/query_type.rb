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
    if context[:current_user]
      raise GraphQL::ExecutionError.new("Invalid Permissions", options: {
        code: "invalidPermissions"
      })
    end

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

  field :application, Types::ApplicationType, description: "Get an application record by its airtable ID", null: true do
    argument :id, ID, required: true
  end

  def application(id: )
    application = Application.find_by_airtable_id(id)
    application = Application.find_by_uid(id) if application.nil?
    return application if application.present?

    raise ApiError::InvalidRequest.new(
      "recordNotFound",
      "Could not find application with id '#{id}'",
    )
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

  field :viewer, Types::ViewerUnion, "Get the current viewer", null: true

  def viewer
    context[:current_user]
  end

  field :countries, [Types::CountryType], "Return the list of countries", null: false

  def countries
    Country.all.order(name: :asc)
  end

  field :skills, [Types::Skill], "Returns a list of skills", null: false do
    argument :local, Boolean, required: false
  end
 
  def skills(local: false)
    return Skill.where(active: true, original: nil) if local
    Rails.cache.fetch("airtable_active_skills", expires_in: 10.minutes) do
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
    specialist = Specialist.find_by_uid(id)
    specialist = Specialist.find_by_airtable_id!(id) if specialist.nil?
    specialist
  end

  field :industries, [Types::IndustryType], null: false

  def industries
    Industry.all.order(name: :asc)
  end

  field :task, Types::TaskType, null: true do
    argument :id, ID, required: true
  end

  def task(id: )
    Task.find_by_uid!(id)
  end

  field :currencies, [Types::CurrencyType], null: false do
    description 'A list of all currencies'
  end

  def currencies
    Money::Currency.all.sort_by do |c|
      c.name
    end
  end

  field :off_platform_project, Types::OffPlatformProject, null: false do
    argument :id, ID, required: true
  end

  def off_platform_project(id:)
    OffPlatformProject.find_by_uid!(id)
  end

  field :specialists, Types::SpecialistConnection, null: false, max_page_size: 25 do
    description <<~HEREDOC
      Returns a list of specialists that match a given search criteria.
    HEREDOC

    argument :skill, String, required: true do
      description "Filters specialists by a given skill."
    end

    argument :industry, String, required: false do
      description <<~HEREDOC
        If provided will only return specialists that have previous projects
        working in the given industry.
      HEREDOC
    end

    argument :company_type, String, required: false do
      description <<~HEREDOC
        If provided will only return specialists that have previous projects
        working with the given company type.
      HEREDOC
    end
  end

  def specialists(skill:, industry: nil, company_type: nil)
    Specialists::Search.call(
      skill: skill,
      industry: industry,
      company_type: company_type
    )
  end
end
