class Mutations::StartClientApplication < Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: false
  argument :email, String, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    email_blacklisted?(args[:email])
    check_existing_specialist_account(args[:email])
    user =
      User.find_or_initialize_by(email: args[:email]) do |u|
        u.application_status = :started
      end

    if user.has_account?
      ApiError.invalidRequest(
        'existingAccount',
        'An account already exists with this email'
      )
    end

    if user.application_status == :started
      user.first_name = args[:first_name]
      user.last_name = args[:last_name]
      user.sync_to_airtable
      user.save
    end

    { clientApplication: user }
  end

  private

  def email_blacklisted?(email)
    return if BlacklistedDomain.email_allowed?(email)
    ApiError.invalidRequest('emailNotAllowed', 'This email is not allowed')
  end

  def check_existing_specialist_account(email)
    return unless Specialist.exists?(email: email)
    ApiError.invalidRequest(
      'existingAccount',
      'This email belongs to a specialist account'
    )
  end
end
