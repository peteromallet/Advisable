class AddReferencesRequestedToApplication < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :references_requested, :boolean
  end
end
