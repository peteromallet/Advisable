# frozen_string_literal: true

class Consultation < ApplicationRecord
  include ::Airtable::Searchable
  include Uid
  belongs_to :specialist
  belongs_to :user
  belongs_to :skill, optional: true
  belongs_to :search, optional: true
  belongs_to :interview, optional: true
end

# == Schema Information
#
# Table name: consultations
#
#  id                    :bigint           not null, primary key
#  accepted_at           :datetime
#  advisable_rejected_at :datetime
#  likely_to_hire        :integer
#  rejected_at           :datetime
#  rejection_reason      :string
#  request_completed_at  :datetime
#  request_started_at    :datetime
#  sent_at               :datetime
#  source                :string
#  status                :string
#  topic                 :string
#  uid                   :string           not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  airtable_id           :string
#  interview_id          :bigint
#  search_id             :bigint
#  skill_id              :bigint
#  specialist_id         :bigint
#  user_id               :bigint
#
# Indexes
#
#  index_consultations_on_airtable_id    (airtable_id)
#  index_consultations_on_interview_id   (interview_id)
#  index_consultations_on_search_id      (search_id)
#  index_consultations_on_skill_id       (skill_id)
#  index_consultations_on_specialist_id  (specialist_id)
#  index_consultations_on_uid            (uid) UNIQUE
#  index_consultations_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (interview_id => interviews.id)
#  fk_rails_...  (skill_id => skills.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (user_id => users.id)
#
