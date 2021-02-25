# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      attr_reader :state, :model, :id, :column

      def initialize(context, model, id, column: :id)
        @state = context[:"lazy_load_#{model}"] ||= {pending: Set.new, loaded: {}}
        @model = "::#{model}".constantize
        @id = id
        @column = column
        state[:pending] << id
      end

      def resolve
        records
      end

      private

      def records
        load_records unless state[:loaded].key?(id)
        state[:loaded][id] || []
      end

      def load_records
        model.where(column => state[:pending]).each do |record|
          state[:loaded][record.public_send(column)] ||= []
          state[:loaded][record.public_send(column)] << record
        end
        state[:pending].clear
      end
    end
  end
end
