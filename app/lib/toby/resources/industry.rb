# frozen_string_literal: true

module Toby
  module Resources
    class Industry < BaseResource
      model_name ::Industry
      attribute :name, Attributes::String

      def self.label(record, _context)
        record.name
      end

      def self.search(query)
        ::Industry.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
