class AddUidToPreviousProjectImages < ActiveRecord::Migration[6.0]
  def change
    add_column :previous_project_images, :uid, :string, index: true
  end
end
