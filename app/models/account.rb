# frozen_string_literal: true

class Account < ApplicationRecord
  include Uid
  include Tutorials
  include Featurable
  include SoftDeletable
  include Resizable

  SUBSCRIPTIONS = ["All", "SMS Alerts", "Automated Invitations", "Personal Invitations", "Onboarding Emails", "Status Surveys"].freeze

  has_logidze

  has_one :user, dependent: :destroy
  has_one :specialist, dependent: :destroy
  has_many :magic_links, dependent: :destroy
  has_many :auth_providers, dependent: :destroy
  has_many :unresponsiveness_reports, foreign_key: :reporter_id, dependent: :destroy, inverse_of: :reporter
  has_many :notifications, dependent: :destroy
  has_many :actor_notifications, class_name: "Notification", foreign_key: :actor_id, dependent: :destroy, inverse_of: :actor
  has_many :interviewer_articles, inverse_of: :interviewer, foreign_key: :interviewer_id, class_name: "CaseStudy::Article", dependent: :nullify
  has_many :editor_articles, inverse_of: :editor, foreign_key: :editor_id, class_name: "CaseStudy::Article", dependent: :nullify
  has_many :messages, dependent: :nullify, foreign_key: :author_id, inverse_of: :author
  has_many :conversation_participants, dependent: :destroy
  has_many :conversations, through: :conversation_participants

  has_one_attached :avatar
  resize avatar: {resize_to_limit: [400, 400]}

  has_secure_password validations: false
  validates :password, length: {minimum: 8}, allow_blank: true, confirmation: true
  validates :email, uniqueness: true, presence: true, format: {with: /@/}

  before_validation :strip_email
  before_save :clear_avatar_cache

  featurize :admin, :team_manager, :editor, column: :permissions

  def specialist_or_user
    specialist || user
  end

  def name
    @name ||= [first_name, last_name].select(&:present?).join(" ")
  end

  def cached_avatar_url
    Rails.cache.fetch("account_avatar_#{id}") { resized_avatar_url }
  end

  def has_password? # rubocop:disable Naming/PredicateName
    password_digest.present?
  end

  def clear_remember_token
    update_columns(remember_token: nil) # rubocop:disable Rails/SkipsModelValidations
  end

  def generate_remember_token
    update_columns(remember_token: new_remember_token) # rubocop:disable Rails/SkipsModelValidations
  end

  def new_remember_token
    loop do
      token = Nanoid.generate(size: 25)
      break token unless self.class.exists?(remember_token: token)
    end
  end

  def create_confirmation_token
    token = Token.new
    self.confirmation_digest = Token.digest(token)
    # eventually this shouldnt be stored in the DB. We have stored it for now
    # so that we can manually resend confirmation emails.
    self.confirmation_token = token
    save(validate: false)
    token
  end

  def reset_password!
    token = Token.new
    self.reset_digest = Token.digest(token)
    self.reset_sent_at = Time.zone.now
    save!
    AccountMailer.reset_password(id: id, token: token).deliver_later
  end

  def disable!(delete: false)
    self.remember_token = nil
    self.disabled_at = Time.zone.now
    self.deleted_at = Time.zone.now if delete
    self.password = SecureRandom.hex
    self.email = "disabled+#{email.sub("@", ".at.")}@advisable.com" unless email.starts_with?("disabled+")
    magic_links.destroy_all
    save!
  end

  def unsubscribed_from
    super || []
  end

  def unsubscribed?(subscription)
    unsubscribed_from.include?("All") || unsubscribed_from.include?(subscription)
  end

  def domain
    email&.split("@")&.last
  end

  def mark_all_notifications_as_read!
    return unless unread_notifications?

    notifications.unread.update_all(read_at: Time.zone.now) # rubocop:disable Rails/SkipsModelValidations
  end

  def unread_notifications?
    notifications.unread.any?
  end

  private

  def strip_email
    return if email.blank?

    self.email = email.strip
  end

  def clear_avatar_cache
    return if avatar.attachment&.persisted?

    Rails.cache.delete("account_avatar_#{id}")
  end
end

# == Schema Information
#
# Table name: accounts
#
#  id                  :integer          not null, primary key
#  first_name          :string
#  last_name           :string
#  password_digest     :string
#  email               :citext
#  uid                 :string           not null
#  confirmed_at        :datetime
#  confirmation_digest :string
#  reset_digest        :string
#  reset_sent_at       :datetime
#  permissions         :jsonb            default("[]")
#  completed_tutorials :jsonb            default("[]")
#  confirmation_token  :string
#  test_account        :boolean
#  remember_token      :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  deleted_at          :datetime
#  unsubscribed_from   :jsonb
#  disabled_at         :datetime
#  features            :jsonb
#
# Indexes
#
#  index_accounts_on_email  (email) UNIQUE
#  index_accounts_on_uid    (uid) UNIQUE
#
