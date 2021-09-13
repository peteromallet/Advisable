# frozen_string_literal: true

module Types
  class SpecialistType < Types::BaseType
    include ActionView::Helpers::DateHelper

    implements Types::AccountInterface

    description <<~HEREDOC
      Represents a freelancer. The Specialist type is also a type of viewer. It
      will be returned for the viewer query when the freelancer is logged in.
    HEREDOC

    field :id, ID, null: false, method: :uid do
      description 'The unique ID for the specialist'
    end

    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs." do
      description 'The airtable ID for the specialist'
    end

    field :city, String, null: true do
      description 'The specialists city'
    end

    field :bio, String, null: true do
      description <<~HEREDOC
        A short bio text for the specialist. This is used to prefill the intro
        text when applying for applications.
      HEREDOC
    end

    field :travel_availability, String, null: true do
      description 'Whether or not the specialist is willing to travel for work'
    end

    field :linkedin, String, null: true do
      description 'The specialists linkedin URL'
    end

    def linkedin
      url = object.linkedin
      return nil if url.blank?

      url.starts_with?('http') ? url : "https://#{url}"
    end

    field :website, String, null: true do
      description 'The specialists portfolio'
    end

    field :phone_number, String, null: true, method: :phone do
      authorize :specialist?, :admin?
      description 'The phone number for the specialist'
    end

    field :image, Types::AttachmentType, null: true, deprecation_reason: "Use #avatar instead" do
      description 'The specialists profile image'
    end

    field :resume, Types::AttachmentType, null: true do
      description 'The specialists resume'
    end

    def resume
      object.resume.attached? ? object.resume : nil
    end

    field :avatar, String, null: true, method: :cached_avatar_url

    field :cover_photo, String, null: true, method: :resized_cover_photo_url

    field :skills, [Types::SpecialistSkillType, {null: true}], null: true do
      description 'A list of skills that the specialist possesses'
      argument :limit, Int, required: false
      argument :project_skills, Boolean, required: false
    end

    # Specialist can have skills from multiple places:
    # - Direct skills they have added to their profile. Associated via
    # SpecialistSkill records.
    # - Skills associated to previous projects that they have worked on
    # By default the skills field will only show direct skills, however, you can
    # include project skills by specifying the project_skills argument.
    def skills(project_skills: false, limit: nil)
      records =
        if project_skills
          (object.skills + object.previous_project_skills).uniq
        else
          object.skills
        end

      sorted = records.sort_by { |s| [s.projects_count, s.specialists_count] }.reverse!
      sorted[0..(limit || (sorted.size + 1)) - 1].map do |skill|
        OpenStruct.new(specialist: object, skill: skill)
      end
    end

    field :case_study_skills, [Types::Skill], null: false
    def case_study_skills
      object.case_study_skills.distinct
    end

    # Project skills returns all of the skills the specialist has used on actual projects.
    field :project_skills, Types::Skill.connection_type, null: false

    def project_skills
      object.previous_project_skills.uniq
    end

    field :industries, [Types::IndustryType], null: false

    field :project_industries, [Types::IndustryType], null: false do
      description 'Returns a list of all the industries the specialist has worked in'
    end

    # TODO: This should eventually be updated to include multiple industries associated with an on
    # platform project
    def project_industries
      object.previous_project_industries.uniq
    end

    field :ratings, Types::Ratings, null: false do
      description 'The combined ratings for the specialist based on previous work'
    end

    # Eventually the reviews and reviewsCount fields should be combined into
    # some kind of Connection type to support pagination and where the count
    # would be a field of the connection type.
    field :reviews, [Types::PreviousProjectReview], null: false do
      description 'A list of reviews for the specialist'
    end

    field :reviews_count, Integer, null: true do
      description 'The amount of reviews a specialist has'
    end

    field :remote, Boolean, null: true do
      description 'Whether or not the specialist will work remotely'
    end

    field :answers, [Types::AnswerType], null: true do
      description 'Answers provided by specialist'
    end

    field :guild, Boolean, null: true do
      description 'Whether or not the specialist is a Guild user'
    end

    field :guild_posts, Types::Guild::PostInterface.connection_type, null: false
    def guild_posts
      object.guild_posts.feed(current_user)
    end

    field :guild_joined_time_ago, String, null: true do
      description 'The timestamp in words for when the specialist first joined the guild'
    end
    def guild_joined_time_ago
      time_ago_in_words(object.guild_joined_date || Time.now.utc)
    end

    field :guild_unread_notifications, Boolean, null: true do
      description 'Whether the guild specialist has unread notifications'
    end

    field :guild_calendly_link, String, null: true do
      description 'The calendly url for the guild specialist'
    end

    field :case_studies, [Types::CaseStudy::Article], null: false do
      description "List of specialist's case studies"
    end

    def case_studies
      ::CaseStudy::Article.where(specialist_id: object.id)
    end

    # TODO: authenticated-application-flow - Simplify this query arguments once
    # we know application flow is authenticated only.
    field :previous_projects, Types::PreviousProject.connection_type, null: false do
      argument :include_drafts, Boolean, required: false
      argument :include_validation_failed, Boolean, required: false
      argument :include_validation_pending, Boolean, required: false
    end

    def previous_projects(include_validation_failed: false, include_drafts: false, include_validation_pending: true)
      validation_statuses = ["Validated"]
      validation_statuses << "Pending" if include_validation_pending
      validation_statuses << "Validation Failed" if include_validation_failed
      records = object.previous_projects.where(validation_status: validation_statuses)
      records = records.published unless include_drafts
      records.order(created_at: :asc)
    end

    field :previous_projects_count, Int, null: false

    def previous_projects_count
      object.project_count || 0
    end

    # TODO: AccountMigration - Rename for consistency
    field :has_account, Boolean, null: false do
      description 'Whether or not the specialist has created their account yet'
    end

    def has_account
      object.account.has_password?
    end

    field :completed_tutorials, [String], null: false do
      authorize :specialist?, :admin?
      description <<~HEREDOC
        An array of tutorial ID's that the user has completed. This is used to
        track when to show onboarding flows for certain features.
      HEREDOC
    end

    def completed_tutorials
      object.account.completed_tutorials
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :specialist?, :admin?
      description 'The timestamp for when the specialist record was created'
    end

    field :application_interview_starts_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :specialist?, :is_admin
      description 'The time for an initial application interview'
    end

    field :application_interview_calendly_id, String, null: true do
      description 'Calendly event id of initial application interview'
    end

    # Eventually the applications field should be updated to support pagination
    # using a connection type. By default we use the 'by_sales_status' scope
    # to only fetch applications where the associated project sales_status is
    # "Open"
    field :applications, [Types::ApplicationType], null: true do
      authorize :specialist?, :admin?
      argument :sales_status, [String], required: false
      argument :status, [String], required: false
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
      authorize :admin?, :specialist?, :applicant_of_company_projects?
      description 'The specialists email address'
    end

    def email
      object.account.email
    end

    field :talk_signature, String, null: false do
      authorize :specialist?
      description 'A unique signature used to for identification with talkjs'
    end

    def talk_signature
      user_id = context[:current_user].uid
      OpenSSL::HMAC.hexdigest('SHA256', ENV['TALKJS_SECRET'], user_id)
    end

    field :country, Types::CountryType, null: true do
      description 'The specialists country'
    end
    def country
      dataloader.with(::ActiveRecordSource, ::Country).load(object.country_id)
    end

    field :location, String, null: true

    def location
      "#{object.city}, #{country.try(:name)}"
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
      description 'Whether or not the freelancers occupation is primarily freelancing'
    end

    field :number_of_projects, String, null: true do
      description 'The number of projects the freelancer has completed'
    end

    field :hourly_rate, Int, null: true do
      description 'The typical hourly rate for this freelancer'
    end

    field :public_use, Boolean, null: true do
      description 'Whether or not the specialist is ok with being used publicly'
    end

    field :application_stage, String, null: true do
      authorize :specialist?
      description 'The account status for the specialist'
    end

    field :profile_projects, [Types::PreviousProject], null: false

    def profile_projects
      object.previous_projects.published.validated.not_hidden.
        sort_by do |previous_project|
        previous_project.try(:priority) || Float::INFINITY
      end
    end

    field :similar_previous_projects, [Types::PreviousProject], null: false do
      description <<~HEREDOC
        Returns up to 3 other previous projects belonging to other specialists
        on advisable that match the specialists skillset.
      HEREDOC
    end

    def similar_previous_projects
      ::PreviousProject.left_outer_joins(:skills).where(
        validation_status: 'Validated', skills: {id: object.skill_ids}
      ).where.not(specialist_id: object.id).limit(3)
    end

    field :unavailable_until, GraphQL::Types::ISO8601DateTime, null: true
    field :previous_work_description, String, null: true
    field :previous_work_results, String, null: true
    field :ideal_project, String, null: true
  end
end
