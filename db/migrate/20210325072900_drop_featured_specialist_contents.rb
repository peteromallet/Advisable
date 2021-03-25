# frozen_string_literal: true

class DropFeaturedSpecialistContents < ActiveRecord::Migration[6.1]
  def up
    drop_table :featured_specialist_contents
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
