# frozen_string_literal: true

module Toby
  module Resources
    class Country < BaseResource
      model_name ::Country
      attribute :uid, Attributes::String
      attribute :name, Attributes::String

      def self.label(record, context)
        Lazy::Label.new(::Country, record.id, context, value_column: :name)
      end

      def self.search(query)
        ::Country.where("name ilike ?", "%#{query}%")
      end
    end
  end
end
