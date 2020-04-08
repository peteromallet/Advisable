class AddDescriptionToSearches < ActiveRecord::Migration[6.0]
  def change
    add_column :searches, :description, :string
  end
end
