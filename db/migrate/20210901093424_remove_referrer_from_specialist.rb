# frozen_string_literal: true

class RemoveReferrerFromSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :specialists, :referrer, :string
    end
  end
end
