# frozen_string_literal: true

module Toby
  module Lazy
    class Multiple
      attr_reader :id, :to, :state, :column

      def initialize(context, to, id, column: :id)
        @column = column
        @to = to
        @state = context[:"lazy_load_#{to}"] ||= {
          pending_ids: Set.new,
          loaded_ids: {}
        }
        @id = id
        if id.is_a?(Array)
          id.each { |i| state[:pending_ids] << i }
        else
          state[:pending_ids] << id
        end
      end

      def records
        loaded_record = state[:loaded_ids][id]
        return loaded_record if loaded_record

        load_records(state[:pending_ids].to_a)
        state[:pending_ids].clear
        state[:loaded_ids][id] || []
      end

      def load_records(ids)
        klass = "::#{to}".constantize
        klass.where(column => ids).each do |record|
          state[:loaded_ids][record.public_send(column)] ||= []
          state[:loaded_ids][record.public_send(column)] << record
        end
      end
    end
  end
end
