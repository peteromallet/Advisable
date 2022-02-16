# frozen_string_literal: true

class AddConsultationToMessages < ActiveRecord::Migration[6.1]
  def change
    add_reference :messages, :consultation, null: true, foreign_key: true
  end
end
