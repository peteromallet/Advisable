# frozen_string_literal: true

module Mutations
  class CreateConsultation < Mutations::BaseMutation
    argument :specialist, ID, required: true
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :company, String, required: false
    argument :skill, String, required: true

    argument :utm_source, String, required: false
    argument :utm_campaign, String, required: false
    argument :utm_medium, String, required: false
    argument :gclid, String, required: false

    field :consultation, Types::ConsultationType, null: true
    field :viewer, Types::ViewerUnion, null: true

    def authorized?(**args)
      if current_user.blank?
        account = Account.find_by(email: args[:email])

        if account
          ApiError.invalid_request('emailBelongsToFreelancer', 'This email belongs to a freelancer account') if Specialist.find_by(account: account)
        else
          create_and_login_new_user(args)
        end
      end

      requires_client!
    end

    def resolve(**args)
      ActiveRecord::Base.transaction do
        consultation = create_consultation(**args)
        {consultation: consultation, viewer: current_user}
      end
    end

    private

    def create_consultation(**args)
      skill = Skill.find_by_name!(args[:skill])
      specialist = Specialist.find_by_uid_or_airtable_id!(args[:specialist])
      consultation = current_user.consultations.find_by(specialist: specialist, status: 'Request Started')

      if consultation.present?
        consultation.update(skill: skill)
      else
        consultation = Consultation.create(
          user: current_user,
          specialist: specialist,
          status: 'Request Started',
          skill: skill,
          source: args[:utm_source],
          request_started_at: Time.zone.now
        )
      end

      consultation.sync_to_airtable
      consultation
    end

    def create_and_login_new_user(args)
      account = Account.new(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email],
        permissions: [:team_manager]
      )

      user = User.create(
        account: account,
        company: Company.new(name: Company.fresh_name_for(args[:company])),
        company_name: args[:company],
        campaign_source: args[:utm_source],
        campaign_name: args[:utm_campaign],
        campaign_medium: args[:utm_medium],
        gclid: args[:gclid]
      )

      domain = user.account.email.split('@').last
      client = Client.create(name: args[:company], domain: domain)
      client.users << user

      user.sync_to_airtable
      # Currently we dont have a relationship between clients and client
      # contacts so we set the 'Client Contacts' column while calling sync.
      client.sync_to_airtable({'Client Contacts' => [user.airtable_id].compact})

      context[:current_account] = account
      context[:current_user] = user
      session_manager.start_session(account)
    end
  end
end
