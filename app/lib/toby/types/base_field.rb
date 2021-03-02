# frozen_string_literal: true

module Toby
  module Types
    class BaseField < GraphQL::Schema::Field
      attr_reader :resource

      def resource_class(klass)
        @resource = klass
      end
    end
  end
end
