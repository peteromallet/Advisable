# frozen_string_literal: true

class AddAudienceToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :audience, :string
  end
end
