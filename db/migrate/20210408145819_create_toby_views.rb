# frozen_string_literal: true

class CreateTobyViews < ActiveRecord::Migration[6.1]
  def change
    create_table :toby_views do |t|
      t.string :name
      t.string :resource
      t.jsonb :filters

      t.timestamps
    end
    add_index :toby_views, :resource
  end
end
