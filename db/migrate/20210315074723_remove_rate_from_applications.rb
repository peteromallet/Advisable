# frozen_string_literal: true

class RemoveRateFromApplications < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :applications, :rate, :decimal }
  end
end
