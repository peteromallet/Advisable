# frozen_string_literal: true

module Toby
  module Lazy
    class Base
      attr_reader :id, :state

      def initialize(context, to, id)
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

      def record
        loaded_record = state[:loaded_ids][id]
        return loaded_record if loaded_record

        load_records(state[:pending_ids].to_a)
        state[:pending_ids].clear
        state[:loaded_ids][id]
      end

      # Override this method when class does not follow .where(id: ids) convention
      def load_records(ids)
        klass = "::#{self.class.name.demodulize}".constantize
        klass.where(id: ids).each do |record|
          state[:loaded_ids][record.id] = record
        end
      end
    end
  end
end
