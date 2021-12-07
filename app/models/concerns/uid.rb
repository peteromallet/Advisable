# frozen_string_literal: true

# Generates a UID for any model that includes UID
# If a model includes the UID module it is expected to have a uid column
module Uid
  extend ActiveSupport::Concern

  class_methods do
    # self.uid_prefix can be used to override the prefix for the uid.
    # by default it will be the first three characters of the class.
    #
    # == example
    # class Deposit < ApplicationRecord
    #   include Uid
    #   uid_prefix 'de'
    # end
    def uid_prefix(prefix)
      @uid_prefix = prefix
    end

    def prefix_for_uid
      @uid_prefix || name[0..2].downcase
    end

    def generate_uid
      "#{prefix_for_uid}_#{AlphanumericId.generate}"
    end

    def valid_uid?(uid)
      prefix, uniq = uid.split("_", 2)
      prefix == prefix_for_uid && uniq&.length == 15
    end
  end

  included do
    before_validation :generate_uid, on: :create
    validate :valid_uid, on: :create
  end

  private

  def generate_uid
    return if uid.present?

    self.uid = unique_uid
  end

  def valid_uid
    prefix, uniq = uid.split("_")
    errors.add(:base, "invalid_id_prefix") if prefix != self.class.prefix_for_uid
    errors.add(:base, "id_too_short") if uniq.length != 15
  end

  def unique_uid
    uid = self.class.generate_uid
    return uid unless self.class.exists?(uid: uid)

    unique_uid
  end
end
