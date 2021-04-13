# frozen_string_literal: true

module Types
  class MutationType < GraphQL::Schema::Object
    description "All the mutations"

    (Mutations.constants - %i[BaseMutation Helpers Guild CaseStudy]).each do |klass|
      public_send(:field, klass.to_s.underscore, mutation: "Mutations::#{klass}".constantize)
    end

    %i[Guild CaseStudy].each do |constant|
      konstant = "Mutations::#{constant}".constantize
      konstant.constants.each do |klass|
        klass = "Mutations::#{constant}::#{klass}".constantize
        public_send(:field, klass.graphql_name.underscore, mutation: klass)
      end
    end
  end
end
