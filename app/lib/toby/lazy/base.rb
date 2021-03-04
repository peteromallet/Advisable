# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      extend Forwardable

      attr_reader :attribute, :id, :context

      def_delegators :attribute, :reflection

      def initialize(attribute, context, resource)
        @attribute = attribute
        @id = resource.public_send(reflection.active_record_primary_key)
        @context = context
        state[:pending] << id
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
        reflection.klass.where(reflection.association_primary_key => state[:pending]).each do |record|
          state[:loaded][record.public_send(reflection.association_primary_key)] ||= []
          state[:loaded][record.public_send(reflection.association_primary_key)] << record
        end
        state[:pending].clear
      end
    end
  end
end
