# frozen_string_literal: true

class AddDueDaysToAgreement < ActiveRecord::Migration[7.0]
  def change
    add_column :agreements, :due_days, :integer
  end
end
