class AddAccountToSpecialistAndUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :specialists, :account, null: false, foreign_key: true
    add_reference :users, :account, null: false, foreign_key: true
  end
end
