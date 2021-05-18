# frozen_string_literal: true

module Mutations
  class StartClientApplication < Mutations::BaseMutation
    include Mutations::Helpers::BlacklistedEmail

    argument :email, String, required: true
    argument :first_name, String, required: true
    argument :last_name, String, required: false
    argument :rid, String, required: false
    argument :utm_campaign, String, required: false
    argument :utm_medium, String, required: false
    argument :utm_source, String, required: false

    field :clientApplication, Types::ClientApplicationType, null: true

    def resolve(**args)
      email_blacklisted?(args[:email])
      check_existing_specialist_account(args[:email])

      ActiveRecord::Base.transaction do
        account = Account.find_or_create_by(email: args[:email])
        ApiError.invalid_request('existingAccount', 'An account already exists with this email') if account.has_password?

        user = User.find_or_create_by(account: account) do |u|
          u.application_status = "Application Started"
          u.rid = args[:rid]
          u.campaign_name = args[:utm_campaign]
          u.campaign_source = args[:utm_source]
          u.campaign_medium = args[:utm_medium]
          u.company = Company.new(name: Company.fresh_name_for(''))
          account.permissions << :team_manager
        end

        if user.application_status == "Application Started"
          account.first_name = args[:first_name]
          account.last_name = args[:last_name]
          if save_account(account) && save_user(user)
            user.sync_to_airtable
            GeocodeAccountJob.perform_later(account, context[:client_ip]) if context[:request]
          end
        end

        {clientApplication: user}
      end
    end

    private

    def save_account(account)
      Logidze.with_responsible(account.id) do
        account.save
      end
    end

    def save_user(user)
      Logidze.with_responsible(user.account_id) do
        user.save
      end
    end

    def check_existing_specialist_account(email)
      return unless Account.find_by(email: email)&.specialist

      ApiError.invalid_request('existingAccount', 'This email belongs to a specialist account')
    end
  end
end
