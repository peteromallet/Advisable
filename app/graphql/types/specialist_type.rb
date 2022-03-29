# frozen_string_literal: true

module Types
  class SpecialistType < Types::BaseType
    include ActionView::Helpers::DateHelper
    delegate :account, to: :object

    implements Types::AccountInterface

    description <<~HEREDOC
      Represents a freelancer. The Specialist type is also a type of viewer. It
      will be returned for the viewer query when the freelancer is logged in.
    HEREDOC

    field :id, ID, null: false, method: :uid do
      description "The unique ID for the specialist"
    end

    field :username, String, null: true
    field :profile_path, String, null: false

    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs." do
      description "The airtable ID for the specialist"
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

    field :travel_availability, String, null: true do
      description "Whether or not the specialist is willing to travel for work"
    end

    field :linkedin, String, null: true do
      description "The specialists linkedin URL"
    end

    field :twitter, String, null: true do
      description "The specialists twitter URL"
    end

    field :instagram, String, null: true do
      description "The specialists instagram URL"
    end

    field :medium, String, null: true do
      description "The specialists medium URL"
    end

    field :website, String, null: true do
      description "The specialists portfolio"
    end

    field :image, Types::AttachmentType, null: true, deprecation_reason: "Use #avatar instead" do
      description "The specialists profile image"
    end

    field :resume, Types::AttachmentType, null: true do
      description "The specialists resume"
    end

    def resume
      object.resume.attached? ? object.resume : nil
    end

    field :cover_photo, String, null: true, method: :resized_cover_photo_url

    field :skills, [Types::SpecialistSkillType, {null: true}], null: true do
      description "A list of skills that the specialist possesses"
      argument :limit, Int, required: false
    end

    def skills(limit: nil)
      sorted = object.skills.sort_by { |s| [s.projects_count, s.specialists_count] }.reverse!
      sorted[0..(limit || (sorted.size + 1)) - 1].map do |skill|
        OpenStruct.new(specialist: object, skill:)
      end
    end

    field :consultation, Types::ConsultationType, null: true
    def consultation
      return unless current_user.is_a?(::User)

      object.consultations.where(user: current_user).order(:created_at).last
    end

    field :case_study_skills, [Types::Skill], null: false
    def case_study_skills
      object.case_study_skills.distinct
    end

    field :industries, [Types::IndustryType], null: false

    field :ratings, Types::Ratings, null: false do
      description "The combined ratings for the specialist based on previous work"
    end

    # Eventually the reviews and reviewsCount fields should be combined into
    # some kind of Connection type to support pagination and where the count
    # would be a field of the connection type.
    field :reviews, [Types::ReviewInterface], null: false do
      description "A list of reviews for the specialist"
    end

    field :reviews_count, Integer, null: true do
      description "The amount of reviews a specialist has"
    end

    field :remote, Boolean, null: true do
      description "Whether or not the specialist will work remotely"
    end

    field :answers, [Types::AnswerType], null: true do
      description "Answers provided by specialist"
    end

    field :guild, Boolean, null: true, deprecation_reason: "Specialists don't need specific access to guild any more" do
      description "Whether or not the specialist is a Guild user"
    end

    field :guild_posts, Types::Guild::Post.connection_type, null: false
    def guild_posts
      object.guild_posts.feed(current_user)
    end

    field :guild_joined_time_ago, String, null: true do
      description "The timestamp in words for when the specialist first joined the guild"
    end
    def guild_joined_time_ago
      time_ago_in_words(object.guild_joined_date || Time.now.utc)
    end

    field :guild_calendly_link, String, null: true do
      description "The calendly url for the guild specialist"
    end

    field :case_studies, [Types::CaseStudy::Article], null: false, method: :articles

    def case_studies
      object.articles.order(created_at: :desc)
    end

    field :case_studies_count, Integer, null: false
    def case_studies_count
      object.articles.active.published.size
    end

    # TODO: AccountMigration - Rename for consistency
    field :has_account, Boolean, null: false do
      description "Whether or not the specialist has created their account yet"
    end
    def has_account
      account.has_password?
    end

    field :completed_tutorials, [String], null: false do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        An array of tutorial ID's that the user has completed. This is used to
        track when to show onboarding flows for certain features.
      HEREDOC
    end
    delegate :completed_tutorials, to: :account

    field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :specialist?, :admin?
      description "The timestamp for when the specialist record was created"
    end

    field :application_interview_starts_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :specialist?, :is_admin
      description "The time for an initial application interview"
    end

    field :application_interview_calendly_id, String, null: true do
      description "Calendly event id of initial application interview"
    end

    field :email, String, null: true do
      authorize :admin?, :specialist?
      description "The specialists email address"
    end
    delegate :email, to: :account

    field :country, Types::CountryType, null: true do
      description "The specialists country"
    end
    def country
      dataloader.with(::ActiveRecordSource, ::Country).load(object.country_id)
    end

    field :location, String, null: true

    def location
      [object.city, country.try(:name)].compact.join(", ")
    end

    field :has_setup_payments, Boolean, null: true do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        Whether or not the specialist has provided their bank information so that
        they can be paid.
      HEREDOC
    end

    field :bank_holder_name, String, null: true do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        The full name or company name of the bank account holder.
      HEREDOC
    end

    field :bank_holder_address, Types::AddressType, null: true do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        The address of the bank accound holder.
      HEREDOC
    end

    field :bank_currency, String, null: true do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        The currency of the specialists bank account.
      HEREDOC
    end

    field :vat_number, String, null: true do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        The specialists VAT number
      HEREDOC
    end

    field :primarily_freelance, Boolean, null: true do
      description "Whether or not the freelancers occupation is primarily freelancing"
    end

    field :number_of_projects, String, null: true do
      description "The number of projects the freelancer has completed"
    end

    field :hourly_rate, Int, null: true do
      description "The typical hourly rate for this freelancer"
    end

    field :public_use, Boolean, null: true do
      description "Whether or not the specialist is ok with being used publicly"
    end

    field :application_stage, String, null: true do
      authorize :specialist?
      description "The account status for the specialist"
    end

    field :unavailable_until, GraphQL::Types::ISO8601DateTime, null: true
    field :previous_work_description, String, null: true
    field :previous_work_results, String, null: true
    field :ideal_project, String, null: true

    field :sourcing_fee, Int, null: true do
      authorize :specialist?
    end

    def sourcing_fee
      (object.sourcing_fee.presence || ::Specialist::DEFAULT_SOURCING_FEE)
    end

    field :conversation, Types::Conversation, null: true
    def conversation
      return if current_user.blank?

      ::Conversation.find_existing_with(current_user, object)
    end

    field :interview, Types::Interview, null: true
    def interview
      requires_client!

      object.interviews.find_by(user: current_user)
    end
  end
end
