# frozen_string_literal: true

module Types
  class MutationType < GraphQL::Schema::Object
    (Mutations.constants - %i[BaseMutation Helpers Guild CaseStudy]).each do |klass|
      public_send(:field, klass.to_s.underscore, mutation: "Mutations::#{klass}".constantize)
    end

    Mutations::CaseStudy.constants.each do |klass|
      klass = "Mutations::CaseStudy::#{klass}".constantize
      public_send(:field, klass.graphql_name.underscore, mutation: klass)
    end

    Mutations::Guild.constants.each do |klass|
      klass = "Mutations::Guild::#{klass}".constantize
      public_send(:field, klass.graphql_name.underscore, mutation: klass)
    end
  end
end
