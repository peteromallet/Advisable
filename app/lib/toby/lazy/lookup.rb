# frozen_string_literal: true

module Toby
  module Lazy
    class Lookup < Single
      def_delegators :attribute, :lazy_id, :lazy_column, :lazy_model, :lazy_read

      def id
        resource.public_send(lazy_id)
      end

      private

      def load_records
        lazy_model.where(lazy_column => state[:pending]).each do |record|
          state[:loaded][record.public_send(lazy_column)] ||= []
          state[:loaded][record.public_send(lazy_column)] << lazy_read(record)
        end
        state[:pending].clear
      end
    end
  end
end
