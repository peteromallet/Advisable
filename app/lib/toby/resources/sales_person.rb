# frozen_string_literal: true

module Toby
  module Resources
    class SalesPerson < BaseResource
      model_name ::SalesPerson
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :username, Attributes::String
      attribute :email, Attributes::String
      attribute :name, Attributes::String, readonly: true

      def self.label(record, context)
        Lazy::Label.new(::SalesPerson, record.id, context, value_column: :username)
      end

      def self.search(query)
        ::SalesPerson.where("username ILIKE ?", "%#{query}%")
      end
    end
  end
end
