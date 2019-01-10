class AddReviewsCountToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :reviews_count, :integer
  end
end
