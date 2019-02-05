class CreateIndustries < ActiveRecord::Migration[5.2]
  def change
    create_table :industries do |t|
      t.string :name
      t.string :uid, index: true

      t.timestamps
    end
  end
end
