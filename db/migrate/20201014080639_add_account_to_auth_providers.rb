class AddAccountToAuthProviders < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      add_reference :auth_providers, :account, foreign_key: true
    end
  end
end
