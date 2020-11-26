class Mutations::CreateUserForCompany < Mutations::BaseMutation
  argument :company_id, ID, required: true
  argument :email, String, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(company_id:, email:, first_name:, last_name:)
    unless BlacklistedDomain.email_allowed?(email)
      raise ApiError::InvalidRequest.new("nonCorporateEmail", "The email #{email} is not allowed")
    end

    company = Company.find(company_id)

    account = Account.new(email: email, first_name: first_name, last_name: last_name)
    account.save!

    user = User.new(
      account: account,
      company_id: company.id,
      company_name: company.name,
      company_type: company.kind,
      application_status: "Active",
      industry: company.industry
    )
    user.save_and_sync_with_responsible!(current_account_id)
    {user: user}
  rescue ActiveRecord::RecordInvalid
    if account.errors.added?(:email, :taken, value: email)
      raise ApiError::InvalidRequest.new("emailTaken", "The email #{email} is already used by another account.")
    elsif account.errors.added?(:email, :blank)
      raise ApiError::InvalidRequest.new("emailBlank", "Email is required.")
    else
      raise
    end
  end
end
