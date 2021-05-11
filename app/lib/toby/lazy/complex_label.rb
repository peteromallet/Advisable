# frozen_string_literal: true

module Toby
  module Lazy
    class ComplexLabel
      attr_reader :klass, :id, :context, :id_column, :includes, :value

      def initialize(klass, id, context, id_column: :id, includes: [], &value)
        @klass = klass
        @id = id
        @context = context
        @id_column = id_column
        @includes = includes
        @value = value
        state[:pending] << id
      end

      def resolve
        load_records unless state[:loaded].key?(id)
        state[:loaded][id]
      end

      private

      def state
        context[:"lazy_load_label_#{klass}"] ||= {pending: Set.new, loaded: {}}
      end

      def load_records
        klass.includes(*includes).where(id_column => state[:pending]).each do |record|
          key = record.public_send(id_column)
          state[:loaded][key] = value.call(record)
        end
        state[:pending].clear
      end
    end
  end
end
