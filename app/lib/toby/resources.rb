# frozen_string_literal: true

module Toby
  module Resources
    IGNORED_KLASSES = ["Toby::Resources::BaseResource"].freeze

    def self.resource_classes
      @resource_classes ||= get_descendants_of(self)
    end

    def self.get_descendants_of(baseklass)
      baseklass.constants.filter_map do |klass|
        klassname = "#{baseklass.name}::#{klass}"
        next if IGNORED_KLASSES.include?(klassname)

        klass = klassname.constantize
        case klass
        when Class
          klass
        when Module
          get_descendants_of(klass)
        end
      end.flatten
    end
  end
end
