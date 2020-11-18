class CopyClientToUser < ActiveRecord::Migration[6.0]
  def up
    ClientUser.all.find_each do |client_user|
      client_user.user.update_columns(client_id: client_user.client_id) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  def down
    # Don't have to do anything
  end
end
