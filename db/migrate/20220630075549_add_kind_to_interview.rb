# frozen_string_literal: true

class AddKindToInterview < ActiveRecord::Migration[7.0]
  def change
    add_column :interviews, :kind, :string
  end
end
