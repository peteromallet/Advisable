class AddCoverToPreviousProjectImages < ActiveRecord::Migration[6.0]
  def change
    add_column :previous_project_images, :cover, :boolean
  end
end
