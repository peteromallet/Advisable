# frozen_string_literal: true

# Adds useful methods for feature flags support via JSONB.
# You need to add JSONB column in the model.
# It's `features` by default but you can pass in `column` option.
module Featurable
  extend ActiveSupport::Concern

  def features
    self["features"] ||= []
  end

  class_methods do
    def featurize(*features, column: :features)
      features.map(&:to_s).each do |feature|
        define_method("#{feature}?") do
          public_send(column).include?(feature)
        end

        define_method("toggle_#{feature}") do
          current = public_send(column)
          value = if current.include?(feature)
                    current - [feature]
                  else
                    current + [feature]
                  end
          public_send("#{column}=", value)
        end

        define_method("toggle_#{feature}!") do
          public_send("toggle_#{feature}")
          save!
        end
      end

      define_singleton_method("all_#{column}") do
        features
      end

      define_singleton_method("with_#{column.to_s.singularize}") do |feature|
        where("#{column} ? :feature", feature:)
      end
    end
  end
end
