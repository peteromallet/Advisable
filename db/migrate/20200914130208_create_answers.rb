class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.string :content
      t.references :question, null: false, foreign_key: true
      t.references :specialist, null: false, foreign_key: true

      t.timestamps
    end
  end
end
