class AddCampaignNameToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :campaign_name, :string
  end
end
