# frozen_string_literal: true

class CopyProjectToPreviousProjectOnApplicationReference < ActiveRecord::Migration[6.1]
  def up
    safety_assured do
      execute <<-SQL
        UPDATE application_references
        SET off_platform_project_id = project_id
        WHERE project_type='PreviousProject';
      SQL
    end
  end

  def down
    ApplicationReference.update_all(off_platform_project_id: nil)
  end
end
