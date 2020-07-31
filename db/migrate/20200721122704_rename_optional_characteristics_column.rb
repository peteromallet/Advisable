class RenameOptionalCharacteristicsColumn < ActiveRecord::Migration[6.0]
  def change
    rename_column :projects, :optional_characteristics, :characteristics
  end
end
