# frozen_string_literal: true

module Advisatable
  module Resources
    def self.resource_classes
      @resource_classes ||= (Advisatable::Resources.constants - [:BaseResource]).map do |klass|
        "Advisatable::Resources::#{klass}".constantize
      end
    end
  end
end
