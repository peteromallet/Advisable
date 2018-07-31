class AddFeaturedToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :featured, :boolean, default: false
  end
end
