class AddSocialProfilesToSpecialist < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_column :specialists, :twitter, :string
      add_column :specialists, :instagram, :string
      add_column :specialists, :medium, :string
    end
  end
end
