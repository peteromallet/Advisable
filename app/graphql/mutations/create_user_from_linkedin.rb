class Mutations::CreateUserFromLinkedin < Mutations::BaseMutation
  argument :email, String, required: true

  field :user, Types::User, null: true

  def authorized?(email:)
    unless context[:oauth_viewer]
      raise ApiError::InvalidRequest.new(
              'notAuthenticated',
              'Not logged into Linkedin'
            )
    end

    true
  end

  def resolve(email:)
    puts 'ASDFASDFas' * 20
    viewer = context[:oauth_viewer]

    if BlacklistedDomain.email_allowed?(email)
      raise ApiError::InvalidRequest.new(
              'nonCorporateEmail',
              "The email #{email} is not allowed"
            )
    end

    user =
      User.new(
        email: email, first_name: viewer.first_name, last_name: viewer.last_name
      )

    if user.save
      user.sync_to_airtable
      return { user: user }
    else
      puts user.errors.full_messages
      if user.errors.added?(:email, :taken)
        raise ApiError::InvalidRequest.new(
                'emailTaken',
                "The email #{email} is already used by another account"
              )
      end
    end
  end
end
