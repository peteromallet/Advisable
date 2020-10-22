class AddAccountIdToExistingAuthProviders < ActiveRecord::Migration[6.0]
  class MigrationUser < ActiveRecord::Base
    self.table_name = :users
  end

  class MigrationAuthProvider < ActiveRecord::Base
    self.table_name = :auth_providers
  end

  def up
    MigrationAuthProvider.where.not(user_id: nil).each do |auth_provider|
      auth_provider.update_columns(account_id: MigrationUser.find(auth_provider.user_id).account_id)
    end
  end
end
