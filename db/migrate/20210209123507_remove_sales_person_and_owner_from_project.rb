# frozen_string_literal: true

class RemoveSalesPersonAndOwnerFromProject < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :projects, :sales_person_id, :bigint
      remove_column :projects, :owner, :string
    end
  end
end
