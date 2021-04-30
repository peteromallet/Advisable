# frozen_string_literal: true

module Mutations
  class ResetClientApplication < Mutations::BaseMutation
    argument :id, ID, required: true

    field :clientApplication, Types::ClientApplicationType, null: true

    def resolve(**args)
      user = User.find_by_uid_or_airtable_id!(args[:id])

      user.application_status = "Application Started"
      user.accepted_guarantee_terms_at = nil
      user.skill_ids = []
      user.locality_importance = nil
      user.number_of_freelancers = nil
      user.rejection_reason = nil
      user.talent_quality = nil

      user.company.update(budget: nil)

      user.save_and_sync!

      {clientApplication: user}
    end
  end
end
