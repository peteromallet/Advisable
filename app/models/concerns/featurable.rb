# frozen_string_literal: true

# Adds useful methods for feature flags support via JSONB.
# You need to add `features` JSONB column in the model via a migration.
module Featurable
  extend ActiveSupport::Concern

  included do
    store_accessor :features
  end

  def features
    self["features"] ||= {}
  end

  class_methods do
    def featurize(*flags)
      flags.map(&:to_s).each do |flag|
        define_method("#{flag}?") do
          !!features[flag] # rubocop:disable Style/DoubleNegation
        end

        define_method("#{flag}=") do |param|
          features.merge!(flag => param)
        end

        define_method("toggle_#{flag}") do
          public_send("#{flag}=", !features[flag])
        end

        define_method("toggle_#{flag}!") do
          public_send("toggle_#{flag}")
          save!
        end

        scope("with_#{flag}_feature", -> { where("features @> ?", {flag => true}.to_json) })
      end

      define_singleton_method(:feature_flags) do
        flags
      end
    end
  end
end
