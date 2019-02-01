class CreateProjectSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :project_skills do |t|
      t.belongs_to :skill, foreign_key: true
      t.references :project, polymorphic: true, index: true

      t.timestamps
    end
  end
end
