class AddAccountToSpecialistAndUser < ActiveRecord::Migration[6.0]
  def change
    add_reference :specialists, :account, foreign_key: true
    add_reference :users, :account, foreign_key: true
  end
end
