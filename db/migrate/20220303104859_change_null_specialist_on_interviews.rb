# frozen_string_literal: true

class ChangeNullSpecialistOnInterviews < ActiveRecord::Migration[7.0]
  def change
    change_column_null :interviews, :specialist_id, false
  end
end
