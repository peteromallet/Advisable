# frozen_string_literal: true

class CopyBankTransfersEnabledFromUserToCompany < ActiveRecord::Migration[6.1]
  class MigrationUser < ApplicationRecord
    self.table_name = :users
  end

  class MigrationCompany < ApplicationRecord
    self.table_name = :companies
  end

  def up
    company_ids = MigrationUser.where(bank_transfers_enabled: true).pluck(:company_id)
    MigrationCompany.where(id: company_ids).update_all(bank_transfers_enabled: true)
  end
end
