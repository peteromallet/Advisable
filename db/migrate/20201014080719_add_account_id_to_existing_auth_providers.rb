class AddAccountIdToExistingAuthProviders < ActiveRecord::Migration[6.0]
  def up
    AuthProvider.all.each do |auth_provider|
      auth_provider.update_columns(account_id: User.find(auth_provider.user_id).account_id)
    end
  end
end
