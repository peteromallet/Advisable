# frozen_string_literal: true

class MarkSystemMessages < ActiveRecord::Migration[6.1]
  class MigrationMessage < ApplicationRecord
    self.table_name = :messages
  end

  def up
    MigrationMessage.where(author_id: nil).update_all(kind: "system")
  end

  def down
    MigrationMessage.where(kind: "system").update_all(author_id: nil)
  end
end
