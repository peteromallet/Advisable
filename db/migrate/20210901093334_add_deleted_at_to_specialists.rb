# frozen_string_literal: true

class AddDeletedAtToSpecialists < ActiveRecord::Migration[6.1]
  def change
    add_column :specialists, :deleted_at, :datetime
  end
end
