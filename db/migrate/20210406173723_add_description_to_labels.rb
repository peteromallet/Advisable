# frozen_string_literal: true

class AddDescriptionToLabels < ActiveRecord::Migration[6.1]
  def change
    add_column :labels, :description, :text
  end
end
