# frozen_string_literal: true

module Toby
  module Resources
    class Industry < BaseResource
      model_name ::Industry
      attribute :name, Attributes::String

      def self.label(record, context)
        Lazy::Label.new(::Industry, record.id, context, value_column: :name)
      end

      def self.search(query)
        ::Industry.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
