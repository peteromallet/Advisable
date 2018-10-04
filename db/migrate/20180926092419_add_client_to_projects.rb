class AddClientToProjects < ActiveRecord::Migration[5.2]
  def change
    add_reference :projects, :client, foreign_key: true
  end
end
