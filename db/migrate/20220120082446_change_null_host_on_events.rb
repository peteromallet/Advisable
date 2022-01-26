# frozen_string_literal: true

class ChangeNullHostOnEvents < ActiveRecord::Migration[7.0]
  def change
    safety_assured do
      change_column_null :events, :host_id, false
    end
  end
end