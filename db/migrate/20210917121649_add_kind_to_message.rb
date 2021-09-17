# frozen_string_literal: true

class AddKindToMessage < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :kind, :string
  end
end
