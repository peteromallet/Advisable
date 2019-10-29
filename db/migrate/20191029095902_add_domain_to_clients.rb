class AddDomainToClients < ActiveRecord::Migration[6.0]
  def change
    add_column :clients, :domain, :string
  end
end
