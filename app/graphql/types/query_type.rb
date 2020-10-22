class Types::QueryType < Types::BaseType
  field :project, Types::ProjectType, null: true do
    argument :id, ID, required: true
  end

  def project(id:)
    Project.find_by_uid_or_airtable_id!(id)
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
    Interview.find_by_uid_or_airtable_id!(id)
  end

  field :user,
        Types::User,
        description: 'Fetch a user record by its airtable ID', null: true do
    argument :id, ID, required: true
  end

  def user(id:)
    ::User.find_by_uid_or_airtable_id!(id)
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

  field :questions, [Types::QuestionType], 'Returns a list of questions', null: true

  def questions
    Question.all
  end

  field :video_call, Types::VideoCallType, null: true do
    argument :id, ID, required: true
  end

  def video_call(id:)
    VideoCall.find_by_uid!(id)
  end

  # Guild
  field :chat_grant, Types::ChatGrantType, null: true do
    description 'Access token grant for twilio chat client'
  end

  def chat_grant
    requires_current_user!
    identity = current_user.uid
    Grants::ChatService.call(identity: identity)
  end

  field :guild_post, Types::Guild::PostInterface, null: true do
    argument :id, ID, required: true
  end

  def guild_post(id:)
    requires_guild_user!
    post = Guild::Post.find(id)
    policy = Guild::PostPolicy.new(context[:current_user], post)

    return post if policy.show
  end

  field :guild_posts,
        Types::Guild::PostInterface.connection_type,
        null: true, max_page_size: 5 do
    description 'Returns a list of guild posts that match a given search criteria'

    argument :type, String, required: false do
      description 'Filters guild posts by type or a curated view'
    end

    argument :topic_ids, [ID], required: false do
      description 'Filters guild posts by guild topic tag ids'
    end
  end

  def guild_posts(**args)
    requires_guild_user!
    @query = Guild::Post.includes(
      :specialist,
      parent_comments: [child_comments: %i[post]]
    ).published

    if (type = args[:type].presence) && type != 'For You'
      @query = @query.where(type: type)
    end

    if args[:topic_ids]&.any?
      guild_topics = Guild::Topic.find(args[:topic_ids])
      @query = @query.tagged_with(guild_topics, on: :guild_topics, any: true)
    end

    @query.order(created_at: :desc)
  end

  field :guild_activity,
        Types::Guild::ActivityUnion.connection_type,
        null: true, max_page_size: 20 do
    description 'Returns a list of guild activity notifications'
  end

  def guild_activity
    requires_guild_user!
    context[:current_user].guild_activity
  end

  field :guild_top_topics,
        Types::Guild::TopicType.connection_type,
        null: true,
        max_page_size: 20 do
    description 'Returns a list of the top guild topic tags'
  end

  def guild_top_topics
    requires_guild_user!

    Guild::Topic.most_used
  end

  field :guild_new_members, [Types::SpecialistType], null: true

  def guild_new_members
    # Upcoming 6.1 won't support: Specialist.guild.jsonb_order(:guild_data, :guild_joined_date, :desc).limit(10)
    Specialist.guild.order(
      Arel.sql("specialists.guild_data -> 'guild_joined_date' desc")
    ).limit(10)
  end
end
