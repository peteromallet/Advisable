# frozen_string_literal: true

class Mutations::AcceptProjectPaymentTerms < Mutations::BaseMutation
  argument :exceptional_terms, String, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(**args)
    if current_company.accepted_project_payment_terms_at.nil?
      current_company.update(accepted_project_payment_terms_at: Time.zone.now)
    end

    # TODO: Move exceptional_project_payment_terms to company record
    if args.key?(:exceptional_terms)
      current_user.exceptional_project_payment_terms = args[:exceptional_terms]
    end

    current_user.save_and_sync_with_responsible!(current_account_id)
    current_company.update_payments_setup

    {user: current_user}
  end
end
