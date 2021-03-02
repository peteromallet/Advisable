# frozen_string_literal: true

module Toby
  module Resources
    def self.resource_classes
      @resource_classes ||= (Toby::Resources.constants - [:BaseResource]).map do |klass|
        "Toby::Resources::#{klass}".constantize
      end
    end
  end
end
