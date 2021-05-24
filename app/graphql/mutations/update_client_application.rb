# frozen_string_literal: true

module Mutations
  class UpdateClientApplication < Mutations::BaseMutation
    argument :budget, Int, required: false
    argument :company_name, String, required: false
    argument :company_type, String, required: false
    argument :id, ID, required: true
    argument :industry, String, required: false
    argument :number_of_freelancers, String, required: false
    argument :skills, [String], required: false

    field :clientApplication, Types::ClientApplicationType, null: true

    def resolve(**args)
      user = User.find_by_uid_or_airtable_id!(args[:id])

      if user.application_status == "Application Started"
        user.number_of_freelancers = args[:number_of_freelancers] if args[:number_of_freelancers]
        update_skills(user, args[:skills]) if args[:skills]
        update_company_attributes(user, args)
        current_account_responsible_for { user.save }
        failed_to_save(user) if user.errors.any?
        user.sync_to_airtable
      end

      {clientApplication: user}
    end

    private

    def failed_to_save(user)
      message = user.errors.full_messages.first
      ApiError.invalid_request('FALIED_TO_SAVE', message)
    end

    def update_company_attributes(user, args)
      user.company.name = args[:company_name] if args[:company_name]
      user.company.budget = args[:budget] if args[:budget]
      user.company.industry = Industry.find_by!(name: args[:industry]) if args[:industry]
      user.company.kind = args[:company_type] if args[:company_type]
      current_account_responsible_for { user.company.save }
    end

    def update_skills(user, skills)
      records = Skill.where(name: skills)
      user.skill_ids = records.map(&:id)
    end
  end
end
