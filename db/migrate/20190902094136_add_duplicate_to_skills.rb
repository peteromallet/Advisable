class AddDuplicateToSkills < ActiveRecord::Migration[6.0]
  def change
    add_reference :skills, :original, references: :skills, index: true
    add_foreign_key :skills, :skills, column: :original_id
  end
end
