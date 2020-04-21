class CreatePreviousProjectImages < ActiveRecord::Migration[6.0]
  def change
    create_table :previous_project_images do |t|
      t.integer :position
      t.belongs_to :off_platform_project, null: false, foreign_key: true

      t.timestamps
    end
  end
end
