class AddCommunityStatusToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :community_status, :string
  end
end
