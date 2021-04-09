# frozen_string_literal: true

module Toby
  class CustomLazy < Lazy::Single
    def id
      resource.user_id
    end

    private

    def load_records
      User.includes(company: :sales_person).where(id: state[:pending]).each do |record|
        state[:loaded][record.id] ||= []
        state[:loaded][record.id] << record&.company&.sales_person&.username
      end
      state[:pending].clear
    end
  end

  module Lookups
    class ProjectSalesPerson < Attributes::String
      filter :is, Filters::Equals do |records, value|
        records.includes(user: {company: :sales_person}).
          where(sales_person: {username: value[0]})
      end

      def self.lookup?
        true
      end

      def readonly
        true
      end

      def lazy_read_class
        Toby::CustomLazy
      end
    end
  end
end
