# frozen_string_literal: false

# Creates a new freelancer account
module Mutations
  class CreateFreelancerAccount < Mutations::BaseMutation
    description <<~HEREDOC
      Creates a new freelancer account
    HEREDOC

    argument :first_name, String, required: true do
      description 'The freelancers first name'
    end

    argument :last_name, String, required: true do
      description 'The freelancers last name'
    end

    argument :email, String, required: true do
      description 'The freelancers email address'
    end

    argument :pid, String, required: false do
      description 'The project ID that they are signing up for.'
    end

    argument :campaign_name, String, required: false do
      description 'The name of the campaign they signed up from'
    end

    argument :campaign_source, String, required: false do
      description 'The source of the campaign they signed up from'
    end

    argument :referrer, String, required: false do
      description 'The rerrer they signed up from'
    end

    field :viewer, Types::ViewerUnion, null: false

    def resolve(**args)
      account = Account.new(
        first_name: args[:first_name],
        last_name: args[:last_name],
        email: args[:email]
      )

      specialist = Specialist.new(
        account: account,
        campaign_name: args[:campaign_name],
        campaign_source: args[:campaign_source],
        application_stage: 'Started',
        pid: args[:pid],
        referrer_id: find_referrer(args[:referrer])
      )

      # frozen_string_literal: false
      # Creates a new freelancer account
      ApiError.invalid_request('EMAIL_TAKEN', 'This email is already being used by another account') if !account.valid? && specialist.valid? && account.errors.added?(:email, "has already been taken")

      success = Logidze.with_responsible(specialist.account_id) do
        specialist.save
      end

      if success
        specialist.bg_sync_to_airtable
        GeocodeAccountJob.perform_later(account, context[:client_ip])
        create_application_record(specialist, args[:pid])
        specialist.send_confirmation_email
      end

      login_as(account)

      {viewer: specialist.reload}
    end

    private

    # TODO: remove airtable lookup
    def find_referrer(uid)
      return nil if uid.blank?

      Sentry.capture_message("We're still getting airtable ids in referrers :unamused:", level: "debug") if uid.match?(/^rec[^_]/)

      Specialist.find_by_uid_or_airtable_id(uid)&.id
    end

    # When a freelancer signs up, they may have come from a campaign that passed
    # a pid (project ID) as a query param. This can be sent with the signup
    # mutation to create an application record for that project.
    def create_application_record(specialist, pid)
      return unless pid

      project = Project.find_by_uid_or_airtable_id(pid)
      project = Airtable::Project.find(pid).sync if project.nil?
      return if project.blank?

      application = specialist.applications.create(project: project, status: 'Invited To Apply')
      application.bg_sync_to_airtable({'Source' => 'new-signup'})
    end
  end
end
