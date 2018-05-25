class CreateSpecialistSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :specialist_skills do |t|
      t.belongs_to :specialist, foreign_key: true
      t.belongs_to :skill, foreign_key: true

      t.timestamps
    end
  end
end
