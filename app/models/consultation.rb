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
#  id                    :integer          not null, primary key
#  uid                   :string           not null
#  specialist_id         :integer
#  user_id               :integer
#  status                :string
#  topic                 :string
#  skill_id              :integer
#  airtable_id           :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  interview_id          :integer
#  source                :string
#  likely_to_hire        :integer
#  request_started_at    :datetime
#  request_completed_at  :datetime
#  sent_at               :datetime
#  accepted_at           :datetime
#  rejected_at           :datetime
#  advisable_rejected_at :datetime
#  search_id             :integer
#  rejection_reason      :string
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
