class AddApplicationToPreviousProjects < ActiveRecord::Migration[6.0]
  def change
    add_reference :off_platform_projects, :application, index: true
  end
end
