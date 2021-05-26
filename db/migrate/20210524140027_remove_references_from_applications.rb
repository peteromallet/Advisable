# frozen_string_literal: true

class RemoveReferencesFromApplications < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :applications, :references_requested, :boolean
    end
  end
end
