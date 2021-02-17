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
        state[:pending_ids] << id
      end

      def record
        loaded_record = state[:loaded_ids][id]
        return loaded_record if loaded_record

        load_records(state[:pending_ids].to_a)
        state[:pending_ids].clear
        state[:loaded_ids][id]
      end

      def load_records(_ids)
        raise NotImplementedError, "Implement this in your Lazy subclass"
      end
    end
  end
end
