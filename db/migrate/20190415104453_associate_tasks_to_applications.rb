class AssociateTasksToApplications < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :application, index: true
    remove_reference :tasks, :booking, index: true
  end
end
