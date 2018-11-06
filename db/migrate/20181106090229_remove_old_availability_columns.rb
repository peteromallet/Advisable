class RemoveOldAvailabilityColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :clients, :availability
    remove_column :interviews, :availability
  end
end
