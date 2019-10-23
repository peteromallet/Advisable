class Airtable::ProjectContent < Airtable::Base
  self.table_name = "Projects"
  sync_with ::ProjectContent
  sync_column "Project ID", to: :project_id
  sync_column "Project Description", to: :project_description
  sync_column "Specialist Review Comment", to: :specialist_review_comment
  sync_column "Specialist Image", to: :specialist_image
  sync_column "Specialist Review Score", to: :specialist_review_score
  sync_column "Specialist ID", to: :specialist_id
  sync_column "Specialist First Name", to: :specialist_first_name
  sync_column "Specialist Last Name", to: :specialist_last_name
  sync_column "Client Industry", to: :client_industry
  sync_column "Client Contact First Name", to: :client_contact_first_name
  sync_column "Cliuent Contact Last Name", to: :client_contact_last_name
  sync_column "Client Name", to: :client_name
  sync_column "Client Contact Job Title", to: :client_contact_job_title
  sync_column "Okay With Naming Client", to: :okay_with_naming_client
  sync_column "Skills Required", to: :skills_required
  sync_column "Pages Featured On", to: :pages_featured_on
  sync_column "Featured Project Score", to: :featured_project_score
  sync_column "Suitable For Freelancers Page", to: :suitable_for_freelancers_page
  sync_column "Client Logo", to: :client_logo
  sync_column "Project Type", to: :project_type
  sync_column "Primary Skill", to: :primary_skill
  sync_column "Specialist Review Comment Length", to: :specialist_review_comment_length
  sync_column "Okay To Use Publicly", to: :okay_to_use_publicly
  sync_column "Specialist City", to: :specialist_city
  sync_column "Specialist Country", to: :specialist_country
  sync_column "Our Talent Page", to: :our_talent_page
  sync_column "Project Description Length", to: :project_description_length
  sync_column "Status", to: :status
  sync_column "Specialist Image Real", to: :specialist_image_real

  class << self
    def base_key
      ENV["AIRTABLE_CONTENT_BASE"]
    end
  end
end
