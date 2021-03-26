# frozen_string_literal: true

module Types
  class QueryType < Types::BaseType
    description "A defined set of types describing what can be queried"

    field :project, Types::ProjectType, null: true do
      argument :id, ID, required: true
    end

    def project(id:)
      ::Project.find_by_uid_or_airtable_id!(id)
    end

    field :application,
          Types::ApplicationType,
          description: 'Get an application record by its airtable ID',
          null: true do
      argument :id, ID, required: true
    end

    def application(id:)
      ::Application.find_by_uid_or_airtable_id!(id)
    end

    field :interview,
          Types::Interview,
          description: 'Fetch an interview record by its airtable ID',
          null: true do
      argument :id, ID, required: true
    end

    def interview(id:)
      ::Interview.find_by_uid_or_airtable_id!(id)
    end

    field :user,
          Types::User,
          description: 'Fetch a user record by its airtable ID', null: true do
      argument :id, ID, required: true
    end

    def user(id:)
      ::User.find_by_uid_or_airtable_id!(id)
    end

    field :current_company, Types::CompanyType, description: 'Get the current company', null: true

    def current_company
      current_user.company
    end

    field :viewer, Types::ViewerUnion, 'Get the current viewer', null: true

    def viewer
      current_user
    end

    field :countries,
          [Types::CountryType],
          'Return the list of countries',
          null: false

    def countries
      ::Country.all.order(name: :asc)
    end

    field :skills, [Types::Skill], 'Returns a list of skills', null: false do
      # TODO: Remove local arg now that it is not being used
      argument :local, Boolean, required: false
    end

    def skills(*)
      ::Skill.where(active: true)
    end

    field :popular_skills, Types::Skill.connection_type, null: false

    def popular_skills
      ::Skill.where(active: true).popular
    end

    field :popular_guild_countries, [Types::LabelType], null: false
    def popular_guild_countries
      Label.on_country.most_used.limit(5)
    end

    field :previous_project, Types::PreviousProject, null: false do
      argument :id, ID, required: true
    end

    def previous_project(id:)
      ::PreviousProject.find_by!(uid: id)
    end

    field :specialist, Types::SpecialistType, null: true do
      argument :id, ID, required: true
    end

    def specialist(id:)
      ::Specialist.find_by_uid_or_airtable_id!(id)
    end

    field :industries, [Types::IndustryType], null: false

    def industries
      ::Industry.active.order(name: :asc)
    end

    field :task, Types::TaskType, null: true do
      argument :id, ID, required: true
    end

    def task(id:)
      ::Task.find_by!(uid: id)
    end

    field :currencies, [Types::CurrencyType], null: false do
      description 'A list of all currencies'
    end

    def currencies
      Money::Currency.all.sort_by(&:name)
    end

    field :consultation, Types::ConsultationType, null: true do
      argument :id, ID, required: true
    end

    def consultation(id:)
      ::Consultation.find_by_uid_or_airtable_id!(id)
    end

    field :oauth_viewer, Types::OauthViewer, null: true

    def oauth_viewer
      context[:oauth_viewer]
    end

    field :client_application, Types::ClientApplicationType, null: true do
      argument :id, ID, required: true
    end

    def client_application(id:)
      ::User.find_by_uid_or_airtable_id!(id)
    end

    field :invoice, Types::InvoiceType, null: true do
      argument :id, ID, required: true
    end

    def invoice(id:)
      ApiError.not_authenticated unless current_user.is_a?(::User)

      invoice = Stripe::Invoice.retrieve(id)

      ApiError.not_authorized("You dont have access to this") if invoice.customer != current_user.company.stripe_customer_id

      invoice
    rescue Stripe::InvalidRequestError
      ApiError.invalid_request('notFound', 'Invoice not found')
    end

    field :questions, [Types::QuestionType], 'Returns a list of questions', null: true

    def questions
      ::Question.all
    end

    field :video_call, Types::VideoCallType, null: true do
      argument :id, ID, required: true
    end

    def video_call(id:)
      ::VideoCall.find_by_uid!(id)
    end

    field :specialist_recommendation, Types::RecommendationInterface, null: true

    def specialist_recommendation
      requires_guild_user!
      ::Recommendation.recommend(current_user)
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

    # We'll likely add an argument after v1, 'filter', which can have a default_value of 'upcoming'
    field :events, Types::EventType.connection_type, null: true

    def events
      requires_guild_user!
      ::Event.upcoming
    end

    field :event, Types::EventType, null: true do
      argument :id, ID, required: true
    end

    def event(id:)
      requires_guild_user!
      ::Event.find_by!(uid: id)
    end

    field :guild_post, Types::Guild::PostInterface, null: true do
      argument :id, ID, required: true
    end

    def guild_post(id:)
      post = ::Guild::Post.find(id)
      policy = ::Guild::PostPolicy.new(current_user, post)
      ApiError.not_authorized("You dont have access to this") unless policy.show

      post
    end

    field :guild_posts, Types::Guild::PostInterface.connection_type, null: true, max_page_size: 5 do
      description 'Returns a list of guild posts for the feed'

      argument :type, String, required: false do
        description 'Filters guild posts by type'
      end
    end

    def guild_posts(**args)
      requires_guild_user!
      query = ::Guild::Post.feed(current_user)

      if (type = args[:type].presence) && type != 'For You'
        query.where(type: type)
      else
        query
      end
    end

    field :label, LabelType, null: true do
      argument :slug, ID, required: true
    end

    def label(slug:)
      requires_guild_user!
      ::Label.published.find_by!(slug: slug)
    end

    field :label_posts, Types::Guild::PostInterface.connection_type, null: true, max_page_size: 5 do
      argument :label_slug, ID, required: true
    end

    def label_posts(label_slug:)
      requires_guild_user!
      query = ::Guild::Post.feed(current_user)
      label = ::Label.published.find_by!(slug: label_slug)
      query.labeled_with(label)
    end

    field :guild_popular_posts, [Types::Guild::PostInterface], null: true

    def guild_popular_posts(**_args)
      ::Guild::Post.popular
    end

    field :guild_activity, Types::Guild::ActivityUnion.connection_type, deprecation_reason: "Use guildNotifications query instead", null: true, max_page_size: 20 do
      description 'Returns a list of guild activity notifications'
    end

    def guild_activity
      requires_guild_user!
      current_user.guild_activity
    end

    field :top_labels, Types::LabelType.connection_type, null: true, max_page_size: 20 do
      description 'Returns a list of the top labels'
    end

    def top_labels
      requires_guild_user!

      ::Label.published.most_used
    end

    field :other_labels, [Types::LabelType], null: true do
      description "Returns other labels that aren't related to skill, industry, or location"
    end

    def other_labels
      ::Label.other
    end

    field :guild_featured_members, [Types::SpecialistType], null: true

    def guild_featured_members
      ::Specialist.guild_featured_members.limit(6)
    end

    field :guild_your_posts,
          Types::Guild::PostInterface.connection_type,
          null: true, max_page_size: 10 do
      description "Returns the specialist's guild_posts"
    end

    def guild_your_posts(**_args)
      requires_guild_user!
      current_user.guild_posts.order(updated_at: :desc)
    end

    field :followed_labels, [Types::LabelType], null: true do
      description 'Returns the labels that the specialists follows'
    end

    def followed_labels(**_args)
      requires_guild_user!
      current_user.subscribed_labels.order(created_at: :desc)
    end

    field :guild_notifications,
          Types::NotificationInterface.connection_type,
          null: true, max_page_size: 20 do
      description "Returns a list of guild notifications"
    end

    def guild_notifications
      requires_guild_user!
      current_user.guild_notifications
    end

    field :case_studies, [Types::CaseStudy::ArticleType], null: true, max_page_size: 20

    def case_studies
      ::CaseStudy::Article.published
    end

    field :case_study, Types::CaseStudy::ArticleType, null: true do
      argument :id, ID, required: true
    end

    def case_study(id:)
      ::CaseStudy::Article.find(id)
    end
  end
end
