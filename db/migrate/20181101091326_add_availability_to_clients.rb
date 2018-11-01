class AddAvailabilityToClients < ActiveRecord::Migration[5.2]
  def change
    add_column :clients, :availability, :text
  end
end
