# frozen_string_literal: true

class RemoveConsultationFromMessage < ActiveRecord::Migration[7.0]
  def change
    remove_reference :messages, :consultation, null: true, foreign_key: true
  end
end
