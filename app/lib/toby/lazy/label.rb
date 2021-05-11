# frozen_string_literal: true

module Toby
  module Lazy
    class Label
      attr_reader :klass, :id, :context, :id_column, :includes, :value_column, :value_block

      # rubocop: disable Metrics/ParameterLists
      def initialize(klass, id, context, id_column: :id, includes: nil, value_column: nil, &value_block)
        @klass = klass
        @id = id
        @context = context
        @id_column = id_column
        @includes = includes
        @value_column = value_column
        @value_block = value_block
        state[:pending] << id
      end
      # rubocop: enable Metrics/ParameterLists

      def resolve
        load_records unless state[:loaded].key?(id)
        state[:loaded][id]
      end

      private

      def state
        context[:"lazy_load_label_#{klass}"] ||= {pending: Set.new, loaded: {}}
      end

      def load_records
        ar = includes ? klass.includes(*includes) : klass
        ar.where(id_column => state[:pending]).each do |record|
          key = record.public_send(id_column)
          value = value_column ? record.public_send(value_column) : value_block.call(record)
          state[:loaded][key] = value
        end
        state[:pending].clear
      end
    end
  end
end
