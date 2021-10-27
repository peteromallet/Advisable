# frozen_string_literal: true

class ResetAllFeatures < ActiveRecord::Migration[6.1]
  class MigrationAccount < ActiveRecord::Base
    self.table_name = :accounts
  end

  def up
    MigrationAccount.update_all(features: nil)
  end
end
