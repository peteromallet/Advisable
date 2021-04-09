# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      extend Forwardable

      attr_reader :attribute, :context, :resource

      def_delegators :attribute, :reflection, :column, :via

      def initialize(attribute, context, resource)
        @attribute = attribute
        @context = context
        @resource = resource
        state[:pending] << id
      end

      def id
        @id ||= resource.public_send(via)
      end

      def resolve
        records
      end

      private

      def state
        context[:"lazy_load_#{attribute}"] ||= {pending: Set.new, loaded: {}}
      end

      def records
        load_records unless state[:loaded].key?(id)
        state[:loaded][id] || []
      end

      def load_records
        reflection.klass.where(column => state[:pending]).each do |record|
          state[:loaded][record.public_send(column)] ||= []
          state[:loaded][record.public_send(column)] << record
        end
        state[:pending].clear
      end
    end
  end
end
