# frozen_string_literal: true

# rubocop:disable Metrics/ParameterLists
module Toby
  module Lazy
    class Through < Base
      attr_reader :through, :through_column, :source_id_column

      def initialize(context, model, through, id, column:, through_column:, source_id_column:)
        super(context, model, id, column: column)
        @through = ActiveSupport::Inflector.classify(through).constantize
        @through_column = through_column
        @source_id_column = source_id_column
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
# rubocop:enable Metrics/ParameterLists
