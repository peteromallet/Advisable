# frozen_string_literal: true

class Mutations::ResetClientApplication < Mutations::BaseMutation
  argument :id, ID, required: true

  field :clientApplication, Types::ClientApplicationType, null: true

  def resolve(**args)
    user = User.find_by_uid_or_airtable_id!(args[:id])

    user.application_status = "Application Started"
    user.accepted_guarantee_terms_at = false
    user.budget = nil
    user.company_name = nil
    user.company.update(kind: nil, industry: nil, name: nil)
    user.client&.update(name: nil)
    user.client&.sync_to_airtable
    user.skill_ids = []
    user.locality_importance = nil
    user.number_of_freelancers = nil
    user.rejection_reason = nil
    user.talent_quality = nil
    user.save
    user.sync_to_airtable

    {clientApplication: user}
  end
end
