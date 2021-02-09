# frozen_string_literal: true

class AddMetaFieldsAndSourceToApplications < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :meta_fields, :jsonb
    add_column :applications, :source, :string
  end
end
