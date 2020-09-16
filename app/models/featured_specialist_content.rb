class FeaturedSpecialistContent < ApplicationRecord
end

# == Schema Information
#
# Table name: featured_specialist_contents
#
#  id                                  :bigint           not null, primary key
#  companies_worked_with               :string
#  edited                              :string
#  examples_of_services                :string
#  featured_biography                  :text
#  featured_biography_character_length :integer
#  featured_specialist_score           :integer
#  featured_specialist_status          :string
#  featured_specialist_status_applied  :datetime
#  featured_specialist_status_posted   :datetime
#  featured_specialist_status_rejected :datetime
#  featured_specialist_status_reviewed :datetime
#  first_30_characters                 :string
#  micro_niche_description             :string
#  micro_niche_rating                  :integer
#  name                                :string
#  name_of_freelancers_with_high_score :string
#  number_of_pages_featured_on         :integer
#  page_skills                         :jsonb
#  secondary_skills                    :jsonb
#  skill                               :jsonb
#  specialist                          :string
#  specialist_city                     :string
#  specialist_country                  :string
#  specialist_image                    :string
#  specialist_image_real               :string
#  specialist_skills                   :string
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#  airtable_id                         :string
#  skill_id                            :string
#  specialist_id                       :string
#
# Indexes
#
#  index_featured_specialist_contents_on_airtable_id  (airtable_id)
#
