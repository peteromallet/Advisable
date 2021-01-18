# frozen_string_literal: true

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

    if user.application_status == "Application Started"
      update_assignable_attributes(user, args)
      update_company_name(user, args[:company_name]) if args[:company_name]
      update_skills(user, args[:skills]) if args[:skills]
      user.company.update(industry: Industry.find_by!(name: args[:industry])) if args[:industry]
      user.company.update(kind: args[:company_type]) if args[:company_type]
      current_account_responsible_for { user.save }
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
    %i[budget number_of_freelancers]
  end

  def update_company_name(user, company_name)
    user.company_name = company_name
    user.company.name = company_name
    user.client&.update(name: company_name)
    user.client&.sync_to_airtable
  end

  def update_assignable_attributes(user, args)
    assignable_attributes.each do |attribute|
      user.public_send("#{attribute}=", args[attribute]) if args[attribute]
    end
  end

  def update_skills(user, skills)
    records = Skill.where(name: skills)
    user.skill_ids = records.map(&:id)
  end
end
