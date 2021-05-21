# frozen_string_literal: true

module Mutations
  class CreateUserFromProjectVerification < Mutations::BaseMutation
    include Mutations::Helpers::BlacklistedEmail

    argument :email, String, required: true
    argument :fid, String, required: true
    argument :previous_project, ID, required: true

    field :user, Types::User, null: true

    def authorized?(previous_project:, email:, fid:)
      unless context[:oauth_viewer]
        ApiError.invalid_request(
          'notAuthenticated',
          'Not logged into Linkedin'
        )
      end

      true
    end

    def resolve(previous_project:, email:, fid:)
      project = PreviousProject.find_by_uid(previous_project)
      viewer = context[:oauth_viewer]

      email_blacklisted?(email)
      account = Account.new(
        email: email,
        first_name: viewer.first_name,
        last_name: viewer.last_name,
        permissions: [:team_manager]
      )
      account.save!

      company = Company.new(
        name: Company.fresh_name_for(project.client_name),
        kind: project.company_type,
        industry: project.primary_industry
      )
      company.save!

      user = User.new(
        account: account,
        company: company,
        fid: fid,
        contact_status: 'Application Started',
        campaign_source: 'validation'
      )
      user.save_and_sync_with_responsible!(current_account_id)
      AttachImageJob.perform_later(user, viewer.image)
      {user: user}
    rescue ActiveRecord::RecordInvalid
      if account.errors.added?(:email, :taken, value: email)
        ApiError.invalid_request("EMAIL_TAKEN", "The email #{email} is already used by another account.")
      elsif account.errors.added?(:email, :blank)
        ApiError.invalid_request("EMAIL_BLANK", "Email is required.")
      else
        raise
      end
    end
  end
end
