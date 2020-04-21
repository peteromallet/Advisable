class AddSalesPersonToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :sales_person, foreign_key: true, null: true
  end
end
