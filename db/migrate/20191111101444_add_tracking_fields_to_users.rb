class AddTrackingFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :campaign_name, :string
    add_column :users, :campaign_source, :string
    add_column :users, :pid, :string
    add_column :users, :rid, :string
    add_column :users, :gclid, :string
  end
end
