class CreateProjectIndustries < ActiveRecord::Migration[6.0]
  def change
    create_table :project_industries do |t|
      t.belongs_to :industry, foreign_key: true
      t.references :project, polymorphic: true, index: true
      t.boolean :primary

      t.timestamps
    end
  end
end
