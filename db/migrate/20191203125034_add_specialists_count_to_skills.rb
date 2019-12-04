class AddSpecialistsCountToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :specialists_count, :int, default: 0
  end
end
