class AddAverageScoreToSpecialists < ActiveRecord::Migration[6.0]
  def change
    add_column :specialists, :average_score, :decimal
  end

  def up
    Specialist.find_each do |specialist|
      specialist.average_score = specialists.applications.average(:score)
      specialist.save(validate: false, touch: false)
    end
  end
end
