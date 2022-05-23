# frozen_string_literal: true

class InterviewParticipant < ApplicationRecord
  belongs_to :interview
  belongs_to :account
end

# == Schema Information
#
# Table name: interview_participants
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint           not null
#  interview_id :bigint           not null
#
# Indexes
#
#  index_interview_participants_on_account_id    (account_id)
#  index_interview_participants_on_interview_id  (interview_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (interview_id => interviews.id)
#
