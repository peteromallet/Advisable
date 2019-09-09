class AddCampaignFieldsToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :pid, :string
    add_column :specialists, :campaign_name, :string
    add_column :specialists, :campaign_source, :string
    add_column :specialists, :referrer, :string
  end
end
