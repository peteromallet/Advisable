# frozen_string_literal: true

class RemovePaymentTable < ActiveRecord::Migration[6.1]
  def up
    drop_table :payments
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
