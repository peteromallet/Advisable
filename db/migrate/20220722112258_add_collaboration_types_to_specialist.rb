# frozen_string_literal: true

class AddCollaborationTypesToSpecialist < ActiveRecord::Migration[7.0]
  def change
    add_column :specialists, :hands_on, :boolean
    add_column :specialists, :consultancy, :boolean
    add_column :specialists, :mentorship, :boolean
  end
end
