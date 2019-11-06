class AddIndustryToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :industry, null: true, foreign_key: true
  end
end
