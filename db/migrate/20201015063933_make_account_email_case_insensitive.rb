class MakeAccountEmailCaseInsensitive < ActiveRecord::Migration[6.0]
  def up
    enable_extension("citext")
    remove_index :accounts, :email
    change_column :accounts, :email, :citext
    add_index :accounts, :email, unique: true
  end
end
