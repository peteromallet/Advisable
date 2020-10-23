class RemoveCampaignColumnsFromAccounts < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      remove_column :accounts, :campaign_name, :string
      remove_column :accounts, :campaign_source, :string
    end
  end
end
