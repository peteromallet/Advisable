# frozen_string_literal: true

class AddUnsubscribedFromToAccount < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :unsubscribed_from, :jsonb
  end
end
