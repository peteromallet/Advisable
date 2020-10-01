class Mutations::CreateUserFromProjectVerification < Mutations::BaseMutation
  argument :previous_project, ID, required: true
  argument :email, String, required: true
  argument :fid, String, required: true

  field :user, Types::User, null: true

  def authorized?(previous_project:, email:, fid:)
    unless context[:oauth_viewer]
      raise ApiError::InvalidRequest.new(
              'notAuthenticated',
              'Not logged into Linkedin'
            )
    end

    true
  end

  def resolve(previous_project:, email:, fid:)
    project = PreviousProject.find_by_uid(previous_project)
    viewer = context[:oauth_viewer]

    unless BlacklistedDomain.email_allowed?(email)
      raise ApiError::InvalidRequest.new(
              'nonCorporateEmail',
              "The email #{email} is not allowed"
            )
    end

    user =
      User.new(
        email: email,
        first_name: viewer.first_name,
        last_name: viewer.last_name,
        company_name: project.client_name,
        company_type: project.company_type,
        fid: fid,
        contact_status: 'Application Started',
        campaign_source: 'validation',
        industry: project.primary_industry
      )

    if user.save
      user.sync_to_airtable
      SetUserImageJob.perform_later(user.id, viewer.image)
      { user: user }
    else
      if user.errors.added?(:email, :taken)
        raise ApiError::InvalidRequest.new(
                'emailTaken',
                "The email #{email} is already used by another account"
              )
      end
    end
  end
end
