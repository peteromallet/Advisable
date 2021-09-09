# frozen_string_literal: true

class AddRetriesToPayment < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :retries, :integer
  end
end
