class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.belongs_to :specialist, foreign_key: true
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
