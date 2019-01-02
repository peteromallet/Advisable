class UseDigestForAccountConfirmation < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :confirmation_token, :confirmation_digest
  end
end
