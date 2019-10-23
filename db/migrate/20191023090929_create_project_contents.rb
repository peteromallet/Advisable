class CreateProjectContents < ActiveRecord::Migration[6.0]
  def change
    create_table :project_contents do |t|
      t.string :airtable_id
      t.string :project_id
      t.text :project_description
      t.string :specialist_review_comment
      t.string :specialist_image
      t.integer :specialist_review_score
      t.string :specialist_id
      t.string :specialist_first_name
      t.string :specialist_last_name
      t.string :client_industry
      t.string :client_contact_first_name
      t.string :client_contact_last_name
      t.string :client_name
      t.string :client_contact_job_title
      t.string :okay_with_naming_client
      t.jsonb :skills_required
      t.jsonb :pages_featured_on
      t.integer :featured_project_score
      t.string :suitable_for_freelancers_page
      t.string :client_logo
      t.string :project_type
      t.jsonb :primary_skill
      t.integer :specialist_review_comment_length
      t.string :okay_to_use_publicly
      t.string :specialist_city
      t.string :specialist_country
      t.string :our_talent_page
      t.integer :project_description_length
      t.string :status
      t.string :specialist_image_real
      t.timestamps
    end
  end
end
