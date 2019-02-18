class CreateApplicationReferences < ActiveRecord::Migration[5.2]
  def change
    create_table :application_references do |t|
      t.string :uid, index: true
      t.belongs_to :application, foreign_key: true
      t.references :project, polymorphic: true

      t.timestamps
    end
  end
end
