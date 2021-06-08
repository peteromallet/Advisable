# frozen_string_literal: true

class AddFieldsToProject < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :projects, bulk: true do |t|
        t.boolean :stop_candidate_proposed_emails
        t.string :level_of_expertise_required
        t.integer :likelihood_to_confirm
        t.string :lost_reason
        t.string :project_start
      end
    end
  end
end
