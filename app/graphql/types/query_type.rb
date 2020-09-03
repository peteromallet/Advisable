class Types::QueryType < Types::BaseType
  field :project,
        Types::ProjectType,
        description: 'Find a Project by ID', null: true do
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
    project = Project.find_by_uid_or_airtable_id!(args[:id])
    policy = ProjectPolicy.new(context[:current_user], project)
    # Return the project if the user has access to it.
    return project if policy.can_access_project?
    # If there is a user logged in but they don't have access then return nil
    if context[:current_user]
      raise GraphQL::ExecutionError.new(
              'Invalid Permissions',
              options: { code: 'invalidPermissions' }
            )
    end

    # Returns special error codes if there is no user logged in.
    user = project.user
    email = user.try(:email)
    has_account = user.try(:has_account?)
    code = has_account ? 'authenticationRequired' : 'signupRequired'
    url = has_account ? '/login' : "/signup/#{user.try(:airtable_id)}"
    extensions = { redirect: url, email: email, code: code }
    raise GraphQL::ExecutionError.new(code, extensions: extensions)
  end

  field :application_rejection_reasons,
        [Types::ApplicationRejectionReasonType, null: true],
        null: true

  def application_rejection_reasons
    ::ApplicationRejectionReason.all
  end

  field :booking_rejection_reasons,
        [Types::BookingRejectionReason, null: true],
        null: true

  def booking_rejection_reasons
    ::BookingRejectionReason.all
  end

  field :application,
        Types::ApplicationType,
        description: 'Get an application record by its airtable ID',
        null: true do
    argument :id, ID, required: true
  end

  def application(id:)
    Application.find_by_uid_or_airtable_id!(id)
  end

  field :interview,
        Types::Interview,
        description: 'Fetch an interview record by its airtable ID',
        null: true do
    argument :id, ID, required: true
  end

  def interview(id:)
    Interview.find_by_airtable_id!(id)
  end

  field :user,
        Types::User,
        description: 'Fetch a user record by its airtable ID', null: true do
    argument :id, ID, required: true
  end

  def user(id:)
    ::User.find_by_airtable_id(id)
  rescue Airrecord::Error => er
    GraphQL::ExecutionError.new("Could not find user #{id}")
  end

  field :viewer, Types::ViewerUnion, 'Get the current viewer', null: true

  def viewer
    context[:current_user]
  end

  field :countries,
        [Types::CountryType],
        'Return the list of countries',
        null: false

  def countries
    Country.all.order(name: :asc)
  end

  field :skills, [Types::Skill], 'Returns a list of skills', null: false do
    argument :local, Boolean, required: false
  end

  def skills(local: false)
    return Skill.where(active: true, original: nil) if local
    Rails.cache.fetch('airtable_active_skills', expires_in: 10.minutes) do
      Airtable::Skill.active.map do |s|
        OpenStruct.new(airtable_id: s.id, name: s.fields['Name'])
      end
    end
  end

  field :popular_skills, Types::Skill.connection_type, null: false

  def popular_skills
    Skill.where(active: true, original: nil).popular
  end

  field :previous_project, Types::PreviousProject, null: false do
    argument :id, ID, required: true
  end

  def previous_project(id:)
    PreviousProject.find_by_uid_or_airtable_id!(id)
  end

  field :specialist, Types::SpecialistType, null: true do
    argument :id, ID, required: true
  end

  def specialist(id:)
    Specialist.find_by_uid_or_airtable_id!(id)
  end

  field :industries, [Types::IndustryType], null: false

  def industries
    Industry.active.order(name: :asc)
  end

  field :task, Types::TaskType, null: true do
    argument :id, ID, required: true
  end

  def task(id:)
    Task.find_by_uid!(id)
  end

  field :currencies, [Types::CurrencyType], null: false do
    description 'A list of all currencies'
  end

  def currencies
    Money::Currency.all.sort_by(&:name)
  end

  field :specialists,
        Types::SpecialistType::ConnectionType,
        null: false, max_page_size: 25 do
    description <<~HEREDOC
      Returns a list of specialists that match a given search criteria.
    HEREDOC

    argument :skill, String, required: true do
      description 'Filters specialists by a given skill.'
    end

    argument :industry, String, required: false do
      description <<~HEREDOC
        If provided will only return specialists that have previous projects
        working in the given industry.
      HEREDOC
    end

    argument :industry_required, Boolean, required: false do
      description <<~HEREDOC
        Wether or not to filter specialists by industry
      HEREDOC
    end

    argument :company_type, String, required: false do
      description <<~HEREDOC
        If provided will only return specialists that have previous projects
        working with the given company type.
      HEREDOC
    end

    argument :company_type_required, Boolean, required: false do
      description <<~HEREDOC
        Wether or not to filter specialists by company type
      HEREDOC
    end
  end

  def specialists(**args)
    Specialists::Search.call(
      skill: args[:skill],
      industry: args[:industry],
      industry_required: args[:industry_required],
      company_type: args[:company_type],
      company_type_required: args[:company_type_required],
      user: context[:current_user]
    )
  end

  field :consultation, Types::ConsultationType, null: true do
    argument :id, ID, required: true
  end

  def consultation(id:)
    Consultation.find_by_uid_or_airtable_id!(id)
  end

  field :search, Types::SearchType, null: true do
    argument :id, ID, required: true
  end

  def search(id:)
    unless context[:current_user].try(:is_a?, User)
      raise ApiError::NotAuthenticated.new('You must be logged in as a user')
    end

    context[:current_user].searches.find_by_uid!(id)
  end

  field :oauth_viewer, Types::OauthViewer, null: true

  def oauth_viewer
    context[:oauth_viewer]
  end

  field :client_application, Types::ClientApplicationType, null: true do
    argument :id, ID, required: true
  end

  def client_application(id:)
    User.find_by_uid_or_airtable_id!(id)
  end

  field :invoice, Types::InvoiceType, null: true do
    argument :id, ID, required: true
  end

  def invoice(id:)
    unless context[:current_user].try(:is_a?, User)
      raise ApiError::NotAuthenticated
    end

    invoice = Stripe::Invoice.retrieve(id)

    if invoice.customer != context[:current_user].stripe_customer_id
      raise ApiError::NotAuthorized.new('You dont have access to this')
    end

    invoice
  rescue Stripe::InvalidRequestError => e
    raise ApiError::InvalidRequest.new('notFound', 'Invoice not found')
  end

    # Guild
  field :guild_post, Types::Guild::PostInterface, null: true do
    argument :id, ID, required: true
  end
  
  def guild_post(id:)
    post = Guild::Post.find(id)
    policy = Guild::PostPolicy.new(context[:current_user], post)

    return post if policy.show

    if context[:current_user]
      raise GraphQL::ExecutionError.new('Invalid Permissions', options: { code: 'invalidPermissions' })
    end
  end

  field :guild_posts,
        Types::Guild::PostInterface.connection_type,
        null: false,
        max_page_size: 10 do
    description "Returns a list of guild posts that match a given search criteria"

    argument :type, String, required: false do
      description 'Filters guild posts by type.'
    end
  end

  def guild_posts
    Guild::Post
      .includes(:specialist, parent_comments: [child_comments: [:post]])
      .published
      .order(created_at: :desc)
  end
end
