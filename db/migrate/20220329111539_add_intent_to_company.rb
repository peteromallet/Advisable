# frozen_string_literal: true

class AddIntentToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :intent, :string
  end
end
