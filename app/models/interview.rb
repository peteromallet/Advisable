# frozen_string_literal: true

class Interview < ApplicationRecord
  self.ignored_columns += %i[specialist_id user_id]

  extend Memoist
  include Uid

  has_logidze

  VALID_STATUSES = [
    "Call Scheduled", "Call Completed", "Call Requested", "Call Reminded",
    "Need More Time Options", "More Time Options Added", "Specialist Requested Reschedule",
    "Client Requested Reschedule", "Specialist Declined", "Auto Declined"
  ].freeze

  PRE_START_STATUSES = ["Call Requested", "Call Reminded", "More Time Options Added"].freeze
  SCHEDULABLE_STATUSES = PRE_START_STATUSES + ["Client Requested Reschedule", "Specialist Requested Reschedule"].freeze
  RESCHEDULABLE_STATUSES = SCHEDULABLE_STATUSES + ["Call Scheduled"]
  DECLINABLE_STATUSES = PRE_START_STATUSES + ["Need More Time Options"].freeze

  belongs_to :article, optional: true, class_name: "::CaseStudy::Article"

  has_one :video_call, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :interview_participants, dependent: :destroy
  has_many :accounts, through: :interview_participants

  scope :scheduled, -> { where(status: "Call Scheduled") }
  scope :requested, -> { where(status: "Call Requested") }
  scope :reminded, -> { where(status: "Call Reminded") }
  scope :upcoming, -> { scheduled.where(starts_at: Time.zone.now..) }
  scope :with_accounts, ->(accounts) { joins(:accounts).where(accounts:).group(:id).having("COUNT(accounts.id) = ?", accounts.size) }

  validates :status, inclusion: {in: VALID_STATUSES}

  def participants
    Sentry.capture_message("Something is still calling Interview#participants! Stop it!", level: "debug")
    accounts
  end

  def specialist_and_user?
    !!(accounts.length == 2 && specialist && user)
  end

  def specialist
    Specialist.find_by(account: accounts)
  end

  def user
    User.find_by(account: accounts)
  end

  def pending?
    SCHEDULABLE_STATUSES.include?(status)
  end
end

# == Schema Information
#
# Table name: interviews
#
#  id                                 :bigint           not null, primary key
#  availability_note                  :string
#  call_requested_at                  :datetime
#  call_scheduled_at                  :datetime
#  client_requested_reschedule_at     :datetime
#  more_time_options_added_at         :datetime
#  reason                             :string
#  requested_more_time_options_at     :datetime
#  specialist_requested_reschedule_at :datetime
#  starts_at                          :datetime
#  status                             :string
#  time_zone                          :string
#  uid                                :string           not null
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  article_id                         :bigint
#  google_calendar_id                 :string
#  specialist_id                      :bigint
#  user_id                            :bigint
#  zoom_meeting_id                    :string
#
# Indexes
#
#  index_interviews_on_article_id     (article_id)
#  index_interviews_on_specialist_id  (specialist_id)
#  index_interviews_on_uid            (uid) UNIQUE
#  index_interviews_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (specialist_id => specialists.id)
#  fk_rails_...  (user_id => users.id)
#
