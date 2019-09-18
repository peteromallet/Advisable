class AddTrialProgramToApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :applications, :trial_program, :boolean
  end
end
