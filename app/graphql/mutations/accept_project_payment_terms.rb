# frozen_string_literal: true

class Mutations::AcceptProjectPaymentTerms < Mutations::BaseMutation
  argument :exceptional_terms, String, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(**args)
    user = current_user
    if user.company.accepted_project_payment_terms_at.nil?
      user.company.update accepted_project_payment_terms_at: Time.zone.now
    end

    # TODO: Move exceptional_project_payment_terms to company record
    if args.key?(:exceptional_terms)
      user.exceptional_project_payment_terms = args[:exceptional_terms]
    end

    user.save_and_sync_with_responsible!(current_account_id)
    user.company.update_payments_setup

    {user: user}
  end
end
