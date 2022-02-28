# frozen_string_literal: true

module Toby
  module Resources
    class Country < BaseResource
      model_name ::Country
      attribute :uid, Attributes::String
      attribute :name, Attributes::String

      def self.label(record, _context)
        record.name
      end

      def self.search(query)
        ::Country.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
