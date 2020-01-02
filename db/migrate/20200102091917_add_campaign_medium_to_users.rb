class AddCampaignMediumToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :campaign_medium, :string
  end
end
