# frozen_string_literal: true

module Toby
  module Resources
    def self.resource_classes
      @resource_classes ||= (Toby::Resources.constants - [:BaseResource]).flat_map do |klass|
        klass = "Toby::Resources::#{klass}".constantize
        if klass.is_a?(Class) && klass < BaseResource
          klass
        else
          # Only one level deep for now. this_is_fine.png
          klass.constants.map do |kklass|
            "#{klass.name}::#{kklass}".constantize
          end
        end
      end
    end
  end
end
