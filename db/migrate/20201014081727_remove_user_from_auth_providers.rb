class RemoveUserFromAuthProviders < ActiveRecord::Migration[6.0]
  def change
    remove_reference :auth_providers, :user, foreign_key: true
    change_column_null :auth_providers, :account_id, false
  end
end
