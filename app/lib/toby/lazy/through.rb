# frozen_string_literal: true

module Toby
  module Lazy
    class Through < Base
      def_delegators :attribute, :through_column, :source_id_column, :constraint

      private

      def through
        @through ||= ActiveSupport::Inflector.classify(attribute.through).constantize
      end

      def load_records
        mapping = through.where(column => state[:pending])
        mapping = mapping.where(constraint) if constraint
        mapping = mapping.pluck(through_column, column).to_h

        model.where(source_id_column => mapping.keys).each do |record|
          state[:loaded][mapping[record.public_send(source_id_column)]] ||= []
          state[:loaded][mapping[record.public_send(source_id_column)]] << record
        end
        state[:pending].clear
      end
    end
  end
end
