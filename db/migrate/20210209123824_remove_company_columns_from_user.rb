# frozen_string_literal: true

class RemoveCompanyColumnsFromUser < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :users, :sales_person_id, :bigint
      remove_column :users, :invoice_name, :string
      remove_column :users, :invoice_company_name, :string
      remove_column :users, :billing_email, :string
      remove_column :users, :address, :jsonb
      remove_column :users, :payments_setup, :boolean
      remove_column :users, :project_payment_method, :string
      remove_column :users, :accepted_project_payment_terms_at, :datetime
      remove_column :users, :industry_id, :bigint
      remove_column :users, :company_type, :string
    end
  end
end
