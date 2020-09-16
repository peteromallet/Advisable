class OffPlatformProject < PreviousProject; end

# == Schema Information
#
# Table name: off_platform_projects
#
#  id                          :bigint           not null, primary key
#  advisable_score             :integer
#  can_contact                 :boolean
#  client_description          :text
#  client_name                 :string
#  company_type                :string
#  confidential                :boolean          default(FALSE)
#  contact_email               :string
#  contact_first_name          :string
#  contact_job_title           :string
#  contact_last_name           :string
#  contact_relationship        :string
#  cost_to_hire                :integer
#  description                 :text
#  description_requires_update :boolean
#  draft                       :boolean
#  execution_cost              :integer
#  goal                        :string
#  hide_from_profile           :boolean
#  industry                    :string
#  industry_relevance          :integer
#  location_relevance          :integer
#  pending_description         :string
#  primary_skill               :string
#  priority                    :integer
#  public_use                  :boolean
#  requirements                :text
#  results                     :text
#  uid                         :string
#  validated                   :boolean          default(FALSE)
#  validated_by_client         :boolean
#  validation_explanation      :string
#  validation_failed_reason    :string
#  validation_method           :string
#  validation_status           :string
#  validation_url              :string
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  airtable_id                 :string
#  application_id              :bigint
#  reviewed_by_id              :bigint
#  specialist_id               :bigint
#
# Indexes
#
#  index_off_platform_projects_on_airtable_id     (airtable_id)
#  index_off_platform_projects_on_application_id  (application_id)
#  index_off_platform_projects_on_reviewed_by_id  (reviewed_by_id)
#  index_off_platform_projects_on_specialist_id   (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#
