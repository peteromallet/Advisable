class AddTalentQualityToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :talent_quality, :string
  end
end
