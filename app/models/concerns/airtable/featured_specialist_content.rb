class Airtable::FeaturedSpecialistContent < Airtable::Base
  self.table_name = "Featured Specialists"
  sync_with ::FeaturedSpecialistContent
  sync_column 'Name', to: :name
  sync_column 'Skill', to: :skill
  sync_column 'Specialist', to: :specialist
  sync_column 'Specialist Skills', to: :specialist_skills
  sync_column 'Featured Biography', to: :featured_biography
  sync_column 'Featured Specialist Score', to: :featured_specialist_score
  sync_column 'Featured Specialist Status', to: :featured_specialist_status
  sync_column 'Specialist ID', to: :specialist_id
  sync_column 'Skill ID', to: :skill_id
  sync_column 'Micro-Niche Description', to: :micro_niche_description
  sync_column 'Companies Worked With', to: :companies_worked_with
  sync_column 'Examples of Services', to: :examples_of_services
  sync_column 'Specialist Image', to: :specialist_image
  sync_column 'Specialist City', to: :specialist_city
  sync_column 'Specialist Country', to: :specialist_country
  sync_column 'Page Skills', to: :page_skills
  sync_column 'Featured Specialist Status = Applied', to: :featured_specialist_status_applied
  sync_column 'Featured Specialist Status = Reviewed', to: :featured_specialist_status_reviewed
  sync_column 'Featured Specialist Status = Posted', to: :featured_specialist_status_posted
  sync_column 'Featured Specialist Status = Rejected', to: :featured_specialist_status_rejected
  sync_column 'Secondary Skills', to: :secondary_skills
  sync_column 'Micro-niche rating', to: :micro_niche_rating
  sync_column 'Featured Biography Character Length', to: :featured_biography_character_length
  sync_column 'Name of freelancers with score >= 6', to: :name_of_freelancers_with_high_score
  sync_column 'Edited?', to: :edited
  sync_column 'Number of pages featured on', to: :number_of_pages_featured_on
  sync_column 'First 30 Characters', to: :first_30_characters
  sync_column 'Specialist Image Real', to: :specialist_image_real

  class << self
    def base_key
      ENV["AIRTABLE_CONTENT_BASE"]
    end
  end
end
