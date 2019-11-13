class AddBankTransferEnabledToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :bank_transfers_enabled, :boolean, default: false
  end

  def up
    User.where(project_payment_method: "Bank Transfer").find_each do |u|
      u.update bank_transfers_enabled: true
    end
  end
end
