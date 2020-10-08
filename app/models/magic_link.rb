class MagicLink < ApplicationRecord
  class Expired < StandardError; end
  class NoUsesRemaining < StandardError; end

  attr_reader :token

  belongs_to :account

  validates :path, presence: true
  validates :digest, presence: true
  validates :expires_at, presence: true
  validates :uses_remaining, presence: true

  before_validation :generate_token, on: :create
  before_validation :default_values, on: :create

  scope :expired, -> { where("expires_at < ?", Time.zone.now) }
  scope :not_expired, -> { where("expires_at >= ?", Time.zone.now) }
  scope :used, -> { where("uses_remaining <= ?", 0) }
  scope :uses_remaining, -> { where("uses_remaining > ?", 0) }

  # In order to use a magic link we need three things; the token, the account
  # that we are trying to authenticate and the path to access.
  def self.for_path(account:, token:, path:)
    account.magic_links.not_expired.uses_remaining.where(path: path).find do |ml|
      ml.valid_token(token)
    end
  end

  def use
    raise Expired if expired?
    raise NoUsesRemaining unless uses_remaining?
    decrement!(:uses_remaining)
  end

  def path=(url)
    uri = URI.parse(url)
    self[:path] = uri.path
  rescue URI::InvalidURIError
    self[:path] = nil
  end

  def valid_token(token)
    return true if BCrypt::Password.new(digest).is_password?(token)
    false
  rescue BCrypt::Errors::InvalidHash
    false
  end

  private

  def default_values
    self.expires_at ||= 1.day.from_now
    self.uses_remaining ||= 1
  end

  def generate_token
    @token = Token.new
    self.digest = Token.digest(token)
  end

  def expired?
    expires_at < Time.zone.now
  end
end

# == Schema Information
#
# Table name: magic_links
#
#  id             :bigint           not null, primary key
#  digest         :string
#  expires_at     :datetime
#  path           :string
#  uses_remaining :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  account_id     :bigint           not null
#
# Indexes
#
#  index_magic_links_on_account_id  (account_id)
#
