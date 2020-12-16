class RemovePrimarySkillFromProject < ActiveRecord::Migration[6.0]
  def change
    safety_assured do
      remove_column :projects, :primary_skill, :string
    end
  end
end
