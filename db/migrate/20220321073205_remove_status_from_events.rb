# frozen_string_literal: true

class RemoveStatusFromEvents < ActiveRecord::Migration[7.0]
  def change
    remove_column :events, :status, :string
  end
end
