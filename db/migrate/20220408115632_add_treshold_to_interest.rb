# frozen_string_literal: true

class AddTresholdToInterest < ActiveRecord::Migration[7.0]
  def change
    add_column :case_study_interests, :treshold, :decimal
  end
end
