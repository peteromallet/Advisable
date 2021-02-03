# frozen_string_literal: true

class AddRejectionFeedbackToApplications < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :rejection_feedback, :text
  end
end
