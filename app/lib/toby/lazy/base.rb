# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      extend Forwardable

      attr_reader :attribute, :id, :context

      def_delegators :attribute, :reflection, :column, :via

      def initialize(attribute, context, resource)
        @attribute = attribute
        @id = resource.public_send(via)
        @context = context
        state[:pending] << id
      end

      def resolve
        records
      end

      def lazy_model
        attribute.try(:lazy_model) || reflection.klass
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
        lazy_model.where(column => state[:pending]).each do |record|
          key = record.public_send(column)
          value = attribute.try(:lazy_read, record) || record
          state[:loaded][key] ||= []
          state[:loaded][key] << value
        end
        state[:pending].clear
      end
    end
  end
end
