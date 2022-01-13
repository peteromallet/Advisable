# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      extend Forwardable

      attr_reader :attribute, :id, :context, :column, :includes

      def_delegators :attribute, :reflection, :via

      def initialize(attribute, context, resource)
        @attribute = attribute
        @id = resource.public_send(via)
        @context = context
        @column = attribute.try(:column) || :id
        @includes = attribute.try(:includes)
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
        if attribute.respond_to?(:load_records)
          attribute.load_records(state[:pending]).each do |key, value|
            state[:loaded][key] ||= []
            state[:loaded][key] << value
          end
        else
          ar = includes ? lazy_model.includes(includes) : lazy_model
          ar.where(column => state[:pending]).each do |record|
            key = record.public_send(column)
            value = if attribute.respond_to?(:lazy_read)
                      attribute.lazy_read(record)
                    else
                      record
                    end
            state[:loaded][key] ||= []
            state[:loaded][key] << value
          end
        end
        state[:pending].clear
      end
    end
  end
end
