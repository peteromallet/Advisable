# frozen_string_literal: true

class AddInterviewToMessages < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_reference :messages, :interview, null: true, index: {algorithm: :concurrently}
  end
end
