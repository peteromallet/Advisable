class CreateOffPlatformProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :off_platform_projects do |t|
      t.string :airtable_id, index: true
      t.belongs_to :specialist, foreign_key: true
      t.string :industry
      t.string :contact_first_name
      t.string :contact_last_name
      t.string :contact_job_title
      t.string :client_name
      t.text :client_description
      t.text :description
      t.text :requirements
      t.text :results
      t.string :primary_skill
      t.boolean :confidential, default: false
      t.boolean :validated, default: false

      t.timestamps
    end
  end
end
