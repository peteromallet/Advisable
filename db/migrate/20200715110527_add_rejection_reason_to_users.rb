class AddRejectionReasonToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :rejection_reason, :string
  end
end
