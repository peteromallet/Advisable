# frozen_string_literal: true

class AddReasonToInterview < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :reason, :string
  end
end
