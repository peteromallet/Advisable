# frozen_string_literal: true

class AddChargedAtToPayments < ActiveRecord::Migration[6.1]
  def change
    add_column :payments, :charged_at, :datetime
  end
end
