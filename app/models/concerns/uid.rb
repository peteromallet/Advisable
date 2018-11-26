# Generates a UID for any model that includes UID
# If a model includes the UID module it is expected to have a uid column
module UID
  extend ActiveSupport::Concern
  CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  included do
    before_validation :generate_uid, on: :create
    validates :uid, presence: true, uniqueness: true

    # self.uid_prefix can be used to override the prefix for the uid.
    # by default it will be the first three characters of the class.
    #
    # == example
    # class Deposit < ApplicationRecord
    #   include UID
    #   uid_prefix 'de'
    # end
    def self.uid_prefix(prefix)
      @uid_prefix = prefix
    end

    # Generates the uid for the model.
    # == example
    # Deposit.generate_uid
    # => dep_8Aymaf6idazxsWa
    def self.generate_uid
      prefix = @uid_prefix || self.name[0..2].downcase
      "#{prefix}_#{Nanoid.generate(size: 15, alphabet: CHARS)}"
    end

    private

    def generate_uid
      self.uid = self.class.generate_uid
    end
  end
end