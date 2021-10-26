# frozen_string_literal: true

class CopyBudgetFromUserToCompany < ActiveRecord::Migration[6.1]
  class MigrationUser < ActiveRecord::Base
    self.table_name = :users
  end

  class MigrationCompany < ActiveRecord::Base
    self.table_name = :companies
  end

  def up
    MigrationUser.where.not(budget: nil).pluck(:company_id, :budget).each do |company_id, budget|
      MigrationCompany.find(company_id).update_columns(budget: budget)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
