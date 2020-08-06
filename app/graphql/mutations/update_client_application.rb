class Mutations::UpdateClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :email, String, required: false
  argument :company_name, String, required: false
  argument :industry, String, required: false
  argument :skills, [String], required: false
  argument :company_type, String, required: false
  argument :number_of_freelancers, String, required: false
  argument :budget, Int, required: false

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    email_blacklisted?(args[:email]) if args[:email]
    check_existing_account(args[:email]) if args[:email]
    user = User.find_by_uid_or_airtable_id!(args[:id])

    if %i[started rejected].include?(user.application_status)
      update_assignable_attributes(user, args)
      update_industry(user, args[:industry]) if args[:industry]
      update_skills(user, args[:skills]) if args[:skills]
      user.save
      failed_to_save(user) if user.errors.any?
      user.sync_to_airtable
    end

    { clientApplication: user }
  end

  private

  def failed_to_save(user)
    message = user.errors.full_messages.first
    raise ApiError::InvalidRequest.new('failedToSave', message)
  end

  # which attributes can just be simply assigned
  def assignable_attributes
    %i[
      first_name
      last_name
      email
      budget
      company_name
      company_type
      number_of_freelancers
    ]
  end

  def update_assignable_attributes(user, args)
    assignable_attributes.each do |attribute|
      user.send("#{attribute}=", args[attribute]) if args[attribute]
    end
  end

  def update_industry(user, industry)
    record = Industry.find_by_name!(industry)
    user.industry = record
  end

  def update_skills(user, skills)
    records = Skill.where(name: skills)
    user.skill_ids = records.map(&:id)
  end

  def email_blacklisted?(email)
    return if BlacklistedDomain.email_allowed?(email)
    ApiError.invalidRequest('emailNotAllowed', 'This email is not allowed')
  end

  def check_existing_account(email)
    account = Account.find_by_email(email)
    return if account.nil?
    ApiError.invalidRequest(
      'existingAccount',
      'This email belongs to an existing account'
    )
  end
end
