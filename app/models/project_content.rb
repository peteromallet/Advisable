class ProjectContent < ApplicationRecord
end

# == Schema Information
#
# Table name: project_contents
#
#  id                               :bigint           not null, primary key
#  client_contact_first_name        :string
#  client_contact_job_title         :string
#  client_contact_last_name         :string
#  client_industry                  :string
#  client_logo                      :string
#  client_name                      :string
#  featured_project_score           :integer
#  okay_to_use_publicly             :string
#  okay_with_naming_client          :string
#  our_talent_page                  :string
#  pages_featured_on                :jsonb
#  primary_skill                    :jsonb
#  project_description              :text
#  project_description_length       :integer
#  project_type                     :string
#  skills_required                  :jsonb
#  specialist_city                  :string
#  specialist_country               :string
#  specialist_first_name            :string
#  specialist_image                 :string
#  specialist_image_real            :string
#  specialist_last_name             :string
#  specialist_review_comment        :string
#  specialist_review_comment_length :integer
#  specialist_review_score          :integer
#  status                           :string
#  suitable_for_freelancers_page    :string
#  created_at                       :datetime         not null
#  updated_at                       :datetime         not null
#  airtable_id                      :string
#  project_id                       :string
#  specialist_id                    :string
#
