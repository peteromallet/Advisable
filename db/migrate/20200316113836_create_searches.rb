class CreateSearches < ActiveRecord::Migration[6.0]
  def change
    create_table :searches do |t|
      t.string :uid, index: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :skill
      t.string :industry
      t.boolean :industry_experience_required
      t.string :company_type
      t.boolean :company_experience_required
      t.belongs_to :recommended_project

      t.timestamps
    end
  end
end
