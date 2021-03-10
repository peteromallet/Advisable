# frozen_string_literal: true

class AddApplicationInterviewStartsAt < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :specialists, bulk: true do |t|
        t.string :application_interview_calendly_id
        t.datetime :application_interview_starts_at
        t.datetime :accepted_at
      end
    end
  end
end
