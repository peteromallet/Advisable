# frozen_string_literal: true

class AddTimestampsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :invited_to_interview_at, :datetime
    add_column :users, :submitted_at, :datetime
  end
end
