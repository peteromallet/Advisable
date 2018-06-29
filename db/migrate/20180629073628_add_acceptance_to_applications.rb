class AddAcceptanceToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :accepts_fee, :boolean
    add_column :applications, :accepts_terms, :boolean
  end
end
