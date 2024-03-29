# frozen_string_literal: true

module Types
  class QueryType < Types::BaseType
    description "A defined set of types describing what can be queried"

    field :interview,
      Types::Interview,
      description: "Fetch an interview record by its airtable ID",
      null: true do
      argument :id, ID, required: true
    end

    def interview(id:)
      ::Interview.find_by!(uid: id)
    end

    field :user,
      Types::User,
      description: "Fetch a user record by its airtable ID", null: true do
      argument :id, ID, required: true
    end

    def user(id:)
      ::User.find_by!(uid: id)
    end

    field :current_company, Types::CompanyType, description: "Get the current company", null: true
    def current_company
      requires_client!
      current_user.company
    end

    field :viewer, Types::ViewerInterface, "Get the current viewer", null: true

    def viewer
      current_user
    end

    field :current_account, Types::Account, null: true

    field :countries,
      [Types::CountryType],
      "Return the list of countries",
      null: false

    def countries
      ::Country.all.order(name: :asc)
    end

    field :skills, [Types::Skill], "Returns a list of skills", null: false

    def skills
      ::Skill.active
    end

    field :specialist, Types::SpecialistType, null: true do
      argument :id, ID, required: true
    end

    def specialist(id:)
      return current_user if current_user.is_a?(::Specialist) && (current_user.uid == id || current_user.username == id)

      query = ::Specialist
      query = query.accepted unless current_account&.admin?
      query.find_by_username_or_id!(id)
    end

    field :industries, [Types::IndustryType], null: false

    def industries
      ::Industry.active.order(name: :asc)
    end

    field :currencies, [Types::CurrencyType], null: false do
      description "A list of all currencies"
    end

    def currencies
      Money::Currency.all.sort_by(&:name)
    end

    field :oauth_viewer, Types::OauthViewer, null: true

    field :invoice, Types::InvoiceType, null: true do
      argument :id, ID, required: true
    end

    def invoice(id:)
      ApiError.not_authenticated unless current_user.is_a?(::User)

      invoice = Stripe::Invoice.retrieve(id)

      ApiError.not_authorized("You dont have access to this") if invoice.customer != current_user.company.stripe_customer_id

      invoice
    rescue Stripe::InvalidRequestError
      ApiError.invalid_request("NOT_FOUND", "Invoice not found")
    end

    field :questions, [Types::QuestionType], "Returns a list of questions", null: true

    def questions
      ::Question.all
    end

    field :video_call, Types::VideoCallType, null: true do
      argument :id, ID, required: true
    end

    def video_call(id:)
      ::VideoCall.find_by_uid!(id)
    end

    field :events, Types::EventConnection, null: true, connection: true

    def events
      requires_accepted_specialist!
      ::Event.list.for_graphql
    end

    field :event, Types::EventType, null: true do
      argument :id, ID, required: true
    end

    def event(id:)
      ::Event.for_graphql.find_by!(uid: id)
    end

    field :upcoming_events, [Types::EventType], null: true
    def upcoming_events
      requires_accepted_specialist!
      ::Event.upcoming.published.for_graphql
    end

    field :collaboration_requests, Types::Guild::Post.connection_type, null: true
    def collaboration_requests
      ::Guild::Post.published.unresolved.order(created_at: :desc)
    end

    field :guild_post, Types::Guild::Post, null: true do
      argument :id, ID, required: true
    end

    def guild_post(id:)
      post = ::Guild::Post.find(id)
      policy = ::Guild::PostPolicy.new(current_user, post)
      ApiError.not_authorized("You dont have access to this") unless policy.show

      post
    end

    field :search_labels, [Types::LabelType], null: true do
      argument :name, String, required: true
    end

    def search_labels(name:)
      requires_accepted_specialist!

      Label.published.where("name ILIKE ?", "%#{name}%").limit(20).order(labelings_count: :desc)
    end

    field :top_labels, Types::LabelType.connection_type, null: true, max_page_size: 20 do
      description "Returns a list of the top labels"
    end

    def top_labels
      requires_accepted_specialist!

      ::Label.published.most_used
    end

    field :followed_labels, [Types::LabelType], null: true do
      description "Returns the labels that the specialists follows"
    end

    def followed_labels(**_args)
      requires_accepted_specialist!
      current_user.subscribed_labels.order(created_at: :desc)
    end

    field :notifications, Types::NotificationInterface.connection_type, null: true, max_page_size: 20
    def notifications
      requires_current_user!
      current_account.notifications.order(created_at: :desc)
    end

    field :case_studies, Types::CaseStudy::Article.connection_type, null: true, max_page_size: 20
    def case_studies
      ::CaseStudy::Article.active.published
    end

    field :case_study, Types::CaseStudy::Article, null: true do
      argument :id, ID, required: true
    end
    def case_study(id:)
      ::CaseStudy::Article.find_by_slug_or_id!(id)
    end

    field :top_case_studies, [Types::CaseStudy::Article], null: true do
      argument :limit, Integer, required: false, default_value: 3
    end

    def top_case_studies(limit:)
      Rails.cache.fetch("top_case_studies_#{limit}", expires_in: 1.day) do
        ::CaseStudy::Article.searchable.trending.first(limit)
      end
    end

    field :case_studies_by_categories, Types::CaseStudy::Article.connection_type do
      argument :skill_categories, [ID], required: true
    end
    def case_studies_by_categories(skill_categories:)
      categories = ::SkillCategory.where(slug: skill_categories)
      skill_ids = categories.flat_map do |category|
        category.skills_with_similar.pluck(:id)
      end.uniq
      cs_skills = ::CaseStudy::Skill.where(skill_id: skill_ids)
      ::CaseStudy::Article.searchable.where(skills: cs_skills).by_score
    end

    field :shared_articles, [Types::CaseStudy::SharedArticle], null: false
    def shared_articles
      current_user.received_articles
    end

    field :case_study_skills, [Types::Skill], null: true

    def case_study_skills
      ::Skill.where(id: ::CaseStudy::Skill.select(:skill_id).distinct)
    end

    field :popular_case_study_skills, [Types::Skill], null: true do
      argument :limit, Integer, required: false
    end

    def popular_case_study_skills(limit = 20)
      skills_by_usage = ::CaseStudy::Skill.select("skill_id, COUNT(skill_id) as usage").
        order("usage DESC").
        group("skill_id").
        limit(limit).
        map(&:skill_id)
      ::Skill.where(id: skills_by_usage)
    end

    field :payment, Types::Payment, null: true do
      argument :id, ID, required: true
    end
    def payment(id:)
      requires_client!
      ::Payment.find_by!(uid: id)
    end

    field :payment_requests, Types::PaymentRequest.connection_type, null: false
    def payment_requests
      requires_current_user!

      if current_user.is_a?(::User)
        current_user.company.payment_requests.order(created_at: :desc)
      else
        current_user.payment_requests.order(created_at: :desc)
      end
    end

    field :payment_request, Types::PaymentRequest, null: true do
      argument :id, ID, required: true
    end
    def payment_request(id:)
      requires_current_user!
      ::PaymentRequest.find_by!(uid: id)
    end

    field :conversations, Types::Conversation.connection_type, null: true
    def conversations
      requires_current_user!
      current_user.account.conversations.includes(participants: :account)
    end

    field :conversation, Types::Conversation, null: true do
      argument :id, ID, required: true
    end
    def conversation(id:)
      requires_current_user!
      current_user.account.conversations.find_by!(uid: id)
    end

    field :skill_categories, [Types::SkillCategory], null: false
    def skill_categories
      ::SkillCategory.all.order(name: :asc)
    end

    field :skill_category, Types::SkillCategory, null: true do
      argument :slug, String, required: true
    end
    def skill_category(slug:)
      ::SkillCategory.find_by!(slug:)
    end

    field :accepted_agreements, [Types::Agreement], null: true
    def accepted_agreements
      requires_current_user!
      current_user.agreements.accepted
    end

    field :interests, [Types::CaseStudy::Interest], null: true
    def interests
      requires_current_user!
      current_user.account.interests
    end

    field :interest, Types::CaseStudy::Interest, null: true do
      argument :id, ID, required: true
    end
    def interest(id:)
      requires_current_user!
      current_user.account.interests.find_by!(uid: id)
    end

    field :topics, [Types::CaseStudy::Topic], null: true
    def topics
      ::CaseStudy::Topic.visible.by_position
    end

    field :topic, Types::CaseStudy::Topic, null: true do
      argument :slug, String, required: true
    end
    def topic(slug:)
      ::CaseStudy::Topic.find_by!(slug:)
    end

    field :feed, Types::CaseStudy::InterestArticle.connection_type, null: true
    def feed
      requires_current_user!
      interests = current_user.account.interests

      interest_article_ids = ::CaseStudy::InterestArticle.
        distinct_articles.
        by_similarity.
        where(interest: interests).
        map(&:id) # don't use .pluck here, it will ignore distinct

      ::CaseStudy::InterestArticle.where(id: interest_article_ids).joins(:article).merge(::CaseStudy::Article.for_feed)
    end

    field :favorited_articles, Types::CaseStudy::Article.connection_type, null: true
    def favorited_articles
      requires_current_user!
      favorited = ::CaseStudy::FavoritedArticle.where(account: current_user.account).order(created_at: :desc).pluck(:article_id)
      ::CaseStudy::Article.searchable.where(id: favorited).in_order_of(:id, favorited)
    end

    field :search, Types::CaseStudy::InterestPreview, null: true do
      argument :term, String, required: true
    end
    def search(term:)
      requires_current_user!
      interest_preview = ::CaseStudy::InterestPreview.find_or_create_by!(term:, account: current_user.account)
      interest_preview.find_results!
      track_event("Search", {term:})
      interest_preview
    end
  end
end
