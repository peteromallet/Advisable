class AddPublisedAtToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :published_at, :datetime
  end
end
