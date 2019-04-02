class AddStatusToMatches < ActiveRecord::Migration[5.2]
  def change
    add_column :matches, :status, :string
  end
end
