class AddAccountToAuthProviders < ActiveRecord::Migration[6.0]
  def change
    add_reference :auth_providers, :account, foreign_key: true
  end
end
