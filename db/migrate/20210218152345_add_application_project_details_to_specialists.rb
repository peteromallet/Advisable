# frozen_string_literal: true

class AddApplicationProjectDetailsToSpecialists < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :specialists, bulk: true do |t|
        t.string :previous_work_description
        t.string :previous_work_results
        t.string :ideal_project
      end
    end
  end
end
