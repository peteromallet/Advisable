class AddClientToUsers < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      add_reference :users, :client, foreign_key: true
    end
  end
end
