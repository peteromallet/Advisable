class CreateWebhookEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :webhook_events do |t|
      t.string :name
      t.string :event
      t.string :url

      t.timestamps
    end
  end
end
