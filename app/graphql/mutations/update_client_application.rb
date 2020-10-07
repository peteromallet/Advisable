class Mutations::UpdateClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :company_name, String, required: false
  argument :industry, String, required: false
  argument :skills, [String], required: false
  argument :company_type, String, required: false
  argument :number_of_freelancers, String, required: false
  argument :budget, Int, required: false

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    if %i[started].include?(user.application_status)
      update_assignable_attributes(user, args)
      update_company_name(user, args[:company_name]) if args[:company_name]
      update_industry(user, args[:industry]) if args[:industry]
      update_skills(user, args[:skills]) if args[:skills]
      user.save
      failed_to_save(user) if user.errors.any?
      user.sync_to_airtable
    end

    {clientApplication: user}
  end

  private

  def failed_to_save(user)
    message = user.errors.full_messages.first
    raise ApiError::InvalidRequest.new('failedToSave', message)
  end

  # which attributes can just be simply assigned
  def assignable_attributes
    %i[budget company_type number_of_freelancers]
  end

  def update_company_name(user, company_name)
    user.company_name = company_name
    user.client&.update(name: company_name)
    user.client&.sync_to_airtable
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
    ApiError.invalid_request(
      code: 'emailNotAllowed',
      message: 'This email is not allowed'
    )
  end

  def check_existing_account(email)
    account = SpecialistOrUser.find_by_email(email)
    return if account.nil?
    ApiError.invalid_request(
      code: 'existingAccount',
      message: 'This email belongs to an existing account'
    )
  end
end
