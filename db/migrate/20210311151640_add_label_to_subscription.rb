# frozen_string_literal: true

class AddLabelToSubscription < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :subscriptions, :label, foreign_key: true, type: :uuid
      add_index :subscriptions, %i[specialist_id label_id], unique: true
    end
  end
end
