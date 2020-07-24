class AddApplicantCountToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :candidate_count, :integer, default: 0
    add_column :projects, :proposed_count, :integer, default: 0
    add_column :projects, :hired_count, :integer, default: 0
  end
end
