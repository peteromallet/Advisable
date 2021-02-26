# frozen_string_literal: true

module Toby
  module Lazy
    class Through < Base
      def_delegators :attribute, :through_column, :source_id_column

      private

      def through
        @through ||= ActiveSupport::Inflector.classify(attribute.through).constantize
      end

      def load_records
        through_mapping = through.where(column => state[:pending]).pluck(through_column, column).to_h
        model.where(source_id_column => through_mapping.keys).each do |record|
          state[:loaded][through_mapping[record.public_send(source_id_column)]] ||= []
          state[:loaded][through_mapping[record.public_send(source_id_column)]] << record
        end
        state[:pending].clear
      end
    end
  end
end
