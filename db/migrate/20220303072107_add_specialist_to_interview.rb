# frozen_string_literal: true

class AddSpecialistToInterview < ActiveRecord::Migration[7.0]
  def change
    add_reference :interviews, :specialist, foreign_key: true
  end
end
