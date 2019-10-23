class CreateFeaturedSpecialistContents < ActiveRecord::Migration[6.0]
  def change
    create_table :featured_specialist_contents do |t|
      t.string :airtable_id, index: true
      t.string :name
      t.jsonb :skill
      t.string :specialist
      t.string :specialist_skills
      t.text :featured_biography
      t.integer :featured_specialist_score
      t.string :featured_specialist_status
      t.string :specialist_id
      t.string :skill_id
      t.string :micro_niche_description
      t.string :companies_worked_with
      t.string :examples_of_services
      t.string :specialist_image
      t.string :specialist_city
      t.string :specialist_country
      t.jsonb :page_skills
      t.datetime :featured_specialist_status_applied
      t.datetime :featured_specialist_status_reviewed
      t.datetime :featured_specialist_status_posted
      t.datetime :featured_specialist_status_rejected
      t.jsonb :secondary_skills
      t.integer :micro_niche_rating
      t.integer :featured_biography_character_length
      t.string :name_of_freelancers_with_high_score
      t.string :edited
      t.integer :number_of_pages_featured_on
      t.string :first_30_characters
      t.string :specialist_image_real
      t.timestamps
    end
  end
end
