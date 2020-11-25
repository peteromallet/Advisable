class Mutations::StartClientApplication < Mutations::BaseMutation
  argument :first_name, String, required: true
  argument :last_name, String, required: false
  argument :email, String, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    email_blacklisted?(args[:email])
    check_existing_specialist_account(args[:email])

    ActiveRecord::Base.transaction do
      account = Account.find_or_create_by(email: args[:email])
      if account.has_password?
        ApiError.invalid_request(code: 'existingAccount', message: 'An account already exists with this email')
      end

      user = User.find_or_create_by(account: account) do |u|
        u.application_status = "Application Started"
        u.company = Company.new(name: Company.fresh_name_for(''))
      end

      if user.application_status == "Application Started"
        account.first_name = args[:first_name]
        account.last_name = args[:last_name]
        if save_account(account) && save_user(user)
          user.sync_to_airtable
          create_client_record(user)
          if context[:request]
            GeocodeUserJob.perform_later(user.id, context[:client_ip])
          end
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

  def create_client_record(user)
    return if user.client.present?

    client = Client.create(domain: user.account.email.split('@').last)
    client.users << user
    client.reload.sync_to_airtable
  end

  def email_blacklisted?(email)
    return if BlacklistedDomain.email_allowed?(email)

    ApiError.invalid_request(
      code: 'emailNotAllowed',
      message: 'This email is not allowed'
    )
  end

  def check_existing_specialist_account(email)
    return unless Account.find_by(email: email)&.specialist

    ApiError.invalid_request(
      code: 'existingAccount',
      message: 'This email belongs to a specialist account'
    )
  end
end
