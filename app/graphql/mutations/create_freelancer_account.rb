# frozen_string_literal: false

# Creates a new freelancer account
module Mutations
  class CreateFreelancerAccount < Mutations::BaseMutation
    description <<~HEREDOC
      Creates a new freelancer account
    HEREDOC

    argument :first_name, String, required: true do
      description "The freelancers first name"
    end

    argument :last_name, String, required: true do
      description "The freelancers last name"
    end

    argument :email, String, required: true do
      description "The freelancers email address"
    end

    argument :password, String, required: false

    argument :pid, String, required: false do
      description "The project ID that they are signing up for."
    end

    argument :campaign_name, String, required: false do
      description "The name of the campaign they signed up from"
    end

    argument :campaign_source, String, required: false do
      description "The source of the campaign they signed up from"
    end

    argument :referrer, String, required: false do
      description "The rerrer they signed up from"
    end

    field :viewer, Types::ViewerUnion, null: false

    def resolve(**args)
      account = Account.new(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email],
        password: args[:password]
      )

      specialist = Specialist.new(
        account:,
        campaign_name: args[:campaign_name],
        campaign_source: args[:campaign_source],
        campaign_medium: args[:campaign_medium],
        application_stage: "Started",
        pid: args[:pid],
        referrer_id: find_referrer(args[:referrer])
      )

      ApiError.invalid_request("EMAIL_TAKEN", "This email is already being used by another account") if !account.valid? && specialist.valid? && account.errors.added?(:email, "has already been taken")

      success = Logidze.with_responsible(specialist.account_id) do
        specialist.save
      end

      if success
        specialist.bg_sync_to_airtable
        GeocodeAccountJob.perform_later(account, context[:client_ip])
        specialist.send_confirmation_email
      end

      login_as(account)

      {viewer: specialist.reload}
    end

    private

    def find_referrer(uid)
      return nil if uid.blank?

      Specialist.find_by(uid:)&.id
    end
  end
end
