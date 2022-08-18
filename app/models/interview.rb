# frozen_string_literal: true

class Interview < ApplicationRecord
  self.ignored_columns = %w[more_time_options_added_at requested_more_time_options_at specialist_requested_reschedule_at client_requested_reschedule_at]
  extend Memoist
  include Participants
  include Uid

  has_logidze

  VALID_KINDS = %w[Consultation Interview].freeze
  VALID_STATUSES = [
    "Call Scheduled", "Call Completed", "Call Requested", "Call Reminded",
    "Auto Declined", "Declined"
  ].freeze

  PRE_START_STATUSES = ["Call Requested", "Call Reminded"].freeze
  SCHEDULABLE_STATUSES = PRE_START_STATUSES
  RESCHEDULABLE_STATUSES = SCHEDULABLE_STATUSES + ["Call Scheduled"]
  DECLINABLE_STATUSES = RESCHEDULABLE_STATUSES

  belongs_to :article, optional: true, class_name: "::CaseStudy::Article"
  belongs_to :requested_by, optional: true, class_name: "Account"

  has_one :video_call, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :participants, class_name: "InterviewParticipant", dependent: :destroy
  has_many :accounts, through: :participants

  scope :scheduled, -> { where(status: "Call Scheduled") }
  scope :requested, -> { where(status: "Call Requested") }
  scope :reminded, -> { where(status: "Call Reminded") }
  scope :upcoming, -> { scheduled.where(starts_at: Time.zone.now..) }
  scope :with_accounts, ->(accounts) { joins(:accounts).where(accounts:).group(:id).having("COUNT(accounts.id) = ?", accounts.size) }

  before_save :set_kind, if: -> { kind.blank? }

  validates :status, inclusion: {in: VALID_STATUSES}
  validates :kind, inclusion: {in: VALID_KINDS}, allow_blank: true

  def conversation
    Conversation.by_accounts(accounts)
  end

  def requested_by
    super.presence || messages.find_by(kind: "InterviewRequest")&.author
  end

  def guests
    account_records - [requested_by]
  end

  def pending?
    SCHEDULABLE_STATUSES.include?(status)
  end

  def reschedule!(starts_at)
    return unless RESCHEDULABLE_STATUSES.include?(status)
    return if (self.starts_at - starts_at).abs < 1.minute

    update!(starts_at:)
    conversation.new_message!(kind: "InterviewRescheduled", interview: self, send_emails: false, metadata: {starts_at: starts_at.iso8601})
  end

  def decline!(declined_by, reason, notify: true)
    return unless DECLINABLE_STATUSES.include?(status)

    conversation.new_message!(kind: "InterviewDeclined", interview: self, send_emails: false)
    if notify && reason.present?
      message = conversation.new_message!(author: declined_by, content: reason, send_emails: false)
      other_accounts = accounts - [declined_by]
      other_accounts.each do |account|
        AccountMailer.interview_declined(account, self, message).deliver_later
      end
    end
    update(status: "Declined", reason:)
    SlackMessageJob.perform_later(channel: "client_activity", text: "#{declined_by.name} declined a call request from #{requested_by.name_with_company}. They provided the following reason: \"#{reason}\".")
  end

  def auto_decline!
    return unless DECLINABLE_STATUSES.include?(status)

    update!(status: "Auto Declined")
    conversation.new_message!(kind: "InterviewAutoDeclined", interview: self, send_emails: false)
    AccountMailer.interview_auto_declined_to_requestor(requested_by, self).deliver_later
    guests.each do |account|
      AccountMailer.interview_auto_declined_to_participant(account, self).deliver_later
    end
    SlackMessageJob.perform_later(channel: "client_activity", text: "The call request by #{requested_by.name_with_company} with #{guests.map(&:name_with_company).to_sentence} was auto declined.")
  end

  def set_kind
    self.kind = if specialist_and_user? && !Agreement.exists?(specialist:, company: user.company)
                  "Consultation"
                else
                  "Interview"
                end
  end
end

# == Schema Information
#
# Table name: interviews
#
#  id                 :bigint           not null, primary key
#  availability_note  :string
#  call_scheduled_at  :datetime
#  kind               :string
#  reason             :string
#  starts_at          :datetime
#  status             :string
#  time_zone          :string
#  uid                :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  article_id         :bigint
#  google_calendar_id :string
#  requested_by_id    :bigint
#  zoom_meeting_id    :string
#
# Indexes
#
#  index_interviews_on_article_id       (article_id)
#  index_interviews_on_requested_by_id  (requested_by_id)
#  index_interviews_on_uid              (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (requested_by_id => accounts.id)
#
