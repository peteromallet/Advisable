# frozen_string_literal: true

module Toby
  module Attributes
    class ProjectSalesPerson < String
      filter :is, Filters::Equals do |records, value|
        records.includes(user: {company: :sales_person}).
          where(sales_person: {username: value[0]})
      end

      def read(resource)
        resource.user&.company&.sales_person&.username
      end

      # TODO: Miha, figure it out
      # def lazy_read_class
      #   Toby::Lazy::Single
      # end
    end
  end
end
