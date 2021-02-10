# frozen_string_literal: true

class CopyBankTransfersEnabledFromUserToCompany < ActiveRecord::Migration[6.1]
  def up
    company_ids = User.where(bank_transfers_enabled: true).pluck(:company_id)
    Company.where(id: company_ids).update_all(bank_transfers_enabled: true) # rubocop:disable Rails/SkipsModelValidations
  end
end
