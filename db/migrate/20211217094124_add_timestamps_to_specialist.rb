# frozen_string_literal: true

class AddTimestampsToSpecialist < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :submitted_at, :datetime
    add_column :specialists, :invited_to_interview_at, :datetime
    add_column :specialists, :interview_completed_at, :datetime
    add_column :specialists, :accepted_at, :datetime
  end
end
