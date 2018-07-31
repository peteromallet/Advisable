class AddCommentToApplications < ActiveRecord::Migration[5.2]
  def change
    add_column :applications, :comment, :string
  end
end
