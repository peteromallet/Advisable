# frozen_string_literal: true

# Adds useful methods for feature flags support via JSONB.
# You need to add `features` JSONB column in the model via a migration.
module Featurable
  extend ActiveSupport::Concern

  included do
    scope :with_feature, ->(feature) { where("features ? :feature", feature: feature) }
  end

  def features
    self["features"] ||= []
  end

  class_methods do
    def featurize(*features)
      features.map(&:to_s).each do |feature|
        define_method("#{feature}?") do
          self.features.include?(feature)
        end

        define_method("toggle_#{feature}") do
          self.features = if self.features.include?(feature)
                            self.features - [feature]
                          else
                            self.features + [feature]
                          end
        end

        define_method("toggle_#{feature}!") do
          public_send("toggle_#{feature}")
          save!
        end
      end

      define_singleton_method(:all_features) do
        features
      end
    end
  end
end
