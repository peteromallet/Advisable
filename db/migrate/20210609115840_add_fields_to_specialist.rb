# frozen_string_literal: true

class AddFieldsToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :specialists, :interviewer, foreign_key: {to_table: :sales_people}
      change_table :specialists, bulk: true do |t|
        t.string :case_study_status
        t.string :trustpilot_review_status
        t.string :campaign_medium
        t.string :application_status
      end
    end
  end
end
