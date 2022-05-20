# frozen_string_literal: true

class CreateInterviewParticipants < ActiveRecord::Migration[7.0]
  def change
    create_table :interview_participants do |t|
      t.references :interview, null: false, foreign_key: true
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
