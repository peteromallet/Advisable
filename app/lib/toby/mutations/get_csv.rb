# frozen_string_literal: true

require "csv"

module Toby
  module Mutations
    class GetCsv < GraphQL::Schema::Mutation
      include Helpers::Filter

      argument :resource, String, required: true
      argument :sort_by, String, required: false
      argument :sort_order, String, required: false
      argument :filters, [Types::FilterInput], required: false

      field :csv, Types::CsvType, null: false

      def resolve(resource:, filters: [], sort_by: "created_at", sort_order: "ASC")
        resource = "Toby::Resources::#{resource}".constantize
        records = resource.model.all.order(sort_by => sort_order)
        records = apply_filters(records, resource, filters)
        columns = resource.attributes.map(&:name)
        csv = CSV.generate(headers: true) do |rows|
          rows << columns
          records.each do |record|
            rows << columns.map { |column| record[column] }
          end
        end

        {csv: Struct.new(:content).new(Base64.encode64(csv))}
      end
    end
  end
end
