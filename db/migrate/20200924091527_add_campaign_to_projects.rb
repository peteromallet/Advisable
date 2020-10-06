class AddCampaignToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :linkedin_campaign_id, :bigint
  end
end
