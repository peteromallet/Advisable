# frozen_string_literal: true

class SalesPersonUniqueUsername < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_index :sales_people, :username, unique: true, algorithm: :concurrently
  end
end
