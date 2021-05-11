# frozen_string_literal: true

module Toby
  module Lazy
    class Label
      attr_reader :klass, :id_column, :value_column, :id, :context

      def initialize(klass, id_column, value_column, id, context)
        @klass = klass
        @id_column = id_column
        @value_column = value_column
        @id = id
        @context = context
        state[:pending] << id
      end

      def resolve
        load_records unless state[:loaded].key?(id)
        state[:loaded][id]
      end

      private

      def state
        context[:"lazy_load_label_#{klass}_#{value_column}"] ||= {pending: Set.new, loaded: {}}
      end

      def load_records
        klass.where(id_column => state[:pending]).each do |record|
          key = record.public_send(id_column)
          value = record.public_send(value_column)
          state[:loaded][key] = value
        end
        state[:pending].clear
      end
    end
  end
end
