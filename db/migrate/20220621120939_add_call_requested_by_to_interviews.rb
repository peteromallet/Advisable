# frozen_string_literal: true

class AddCallRequestedByToInterviews < ActiveRecord::Migration[7.0]
  def change
    add_reference :interviews, :requested_by, null: true, foreign_key: {to_table: :accounts}
  end
end
