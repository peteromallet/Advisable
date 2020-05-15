# Generates a UID for any model that includes UID
# If a model includes the UID module it is expected to have a uid column
module Uid
  extend ActiveSupport::Concern

  included do
    before_validation :generate_uid, on: :create, unless: :uid?
    validates :uid, presence: true, uniqueness: true
    validate :valid_uid, on: :create

    # self.uid_prefix can be used to override the prefix for the uid.
    # by default it will be the first three characters of the class.
    #
    # == example
    # class Deposit < ApplicationRecord
    #   include Uid
    #   uid_prefix 'de'
    # end
    def self.uid_prefix(prefix)
      @uid_prefix = prefix
    end

    def self.prefix_for_uid
      @uid_prefix || self.name[0..2].downcase
    end

    # Generates the uid for the model.
    # == example
    # Deposit.generate_uid
    # => dep_8Aymaf6idazxsWa
    def self.generate_uid
      "#{prefix_for_uid}_#{AlphanumericId.generate}"
    end

    private

    def generate_uid
      self.uid = self.class.generate_uid
    end

    # Ensure that the UID is valid
    def valid_uid
      return unless uid
      prefix, uniq = uid.split('_')
      if prefix != self.class.prefix_for_uid
        errors.add(:base, 'invalid_id_prefix')
      end
      errors.add(:base, 'id_too_short') if uniq.length != 15
    end
  end
end
