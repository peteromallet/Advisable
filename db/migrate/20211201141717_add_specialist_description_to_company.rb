# frozen_string_literal: true

class AddSpecialistDescriptionToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :specialist_description, :string
  end
end
