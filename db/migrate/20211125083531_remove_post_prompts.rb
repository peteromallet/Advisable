# frozen_string_literal: true

class RemovePostPrompts < ActiveRecord::Migration[6.1]
  def change
    drop_table :post_prompts # rubocop:disable Rails/ReversibleMigration
  end
end
