class HiddenProfileProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :applications, :hide_from_profile, :boolean
    add_column :off_platform_projects, :hide_from_profile, :boolean
  end
end
