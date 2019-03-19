class AddApplicationStageToSpecialists < ActiveRecord::Migration[5.2]
  def change
    add_column :specialists, :application_stage, :string
  end
end
