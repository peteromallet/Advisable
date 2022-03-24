# frozen_string_literal: true

class AddReasonToAgreement < ActiveRecord::Migration[7.0]
  def change
    add_column :agreements, :reason, :string
  end
end
