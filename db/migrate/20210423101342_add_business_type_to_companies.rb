# frozen_string_literal: true

class AddBusinessTypeToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column(:companies, :business_type, :string)
  end
end
