# frozen_string_literal: true

class RemoveAirtableIdFromOffPlatformProjects < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :off_platform_projects, :airtable_id, :string }
  end
end
