# frozen_string_literal: true

module Toby
  module Attributes
    def self.attribute_classes
      @attribute_classes ||= (Toby::Attributes.constants - [:BaseAttribute]).map do |klass|
        "Toby::Attributes::#{klass}".constantize
      end
    end
  end
end
