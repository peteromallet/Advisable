class AddUidToReviews < ActiveRecord::Migration[6.0]
  def change
    add_column :reviews, :uid, :string, index: true
  end
end
