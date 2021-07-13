# frozen_string_literal: true

class AddAdminFeeToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :admin_fee, :integer
  end
end
