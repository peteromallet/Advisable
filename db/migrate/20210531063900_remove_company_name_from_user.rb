# frozen_string_literal: true

class RemoveCompanyNameFromUser < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :users, :company_name, :string
    end
  end
end
