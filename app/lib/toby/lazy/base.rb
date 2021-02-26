# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      extend Forwardable

      attr_reader :attribute, :id, :context

      def_delegators :attribute, :column

      def initialize(attribute, context, id)
        @attribute = attribute
        @id = id
        @context = context
        state[:pending] << id
      end

      def resolve
        records
      end

      private

      def model
        @model ||= "::#{attribute.model}".constantize
      end

      def state
        context[:"lazy_load_#{attribute}"] ||= {pending: Set.new, loaded: {}}
      end

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
