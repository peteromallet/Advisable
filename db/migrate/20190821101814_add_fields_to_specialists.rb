class AddFieldsToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :primarily_freelance, :boolean
    add_column :specialists, :number_of_projects, :string
    add_column :specialists, :hourly_rate, :int
  end
end
