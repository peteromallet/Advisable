class CreateWebhooks < ActiveRecord::Migration[5.2]
  def change
    create_table :webhooks do |t|
      t.string :url
      t.string :status
      t.jsonb :data
      t.text :response

      t.timestamps
    end
  end
end
