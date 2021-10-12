# frozen_string_literal: true

class AddMessageToConsultation < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :consultations, :message, null: true, foreign_key: true
    end
  end
end
