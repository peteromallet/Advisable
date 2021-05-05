# frozen_string_literal: true

class AddApplicationInterviewStartsAtToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :application_interview_starts_at, :datetime
  end
end
