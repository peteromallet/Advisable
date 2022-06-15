# frozen_string_literal: true

class AddUserAndInterviewToNotification < ActiveRecord::Migration[7.0]
  def change
    add_reference :notifications, :interview
  end
end
