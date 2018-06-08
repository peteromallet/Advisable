class CreateWebhookConfigurations < ActiveRecord::Migration[5.2]
  def change
    create_table :webhook_configurations do |t|
      t.string :name
      t.string :url
      t.string :type
      t.jsonb :criteria

      t.timestamps
    end
  end
end
