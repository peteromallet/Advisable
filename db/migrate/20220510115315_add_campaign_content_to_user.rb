# frozen_string_literal: true

class AddCampaignContentToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :campaign_content, :string
  end
end
