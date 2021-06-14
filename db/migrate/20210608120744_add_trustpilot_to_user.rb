# frozen_string_literal: true

class AddTrustpilotToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :trustpilot_review_status, :string
  end
end
