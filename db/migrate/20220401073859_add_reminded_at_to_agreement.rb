# frozen_string_literal: true

class AddRemindedAtToAgreement < ActiveRecord::Migration[7.0]
  def change
    add_column :agreements, :reminded_at, :datetime
  end
end
