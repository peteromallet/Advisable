# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateSearch < Mutations::BaseMutation
      description "Create a Case Study Search as the current User."
      graphql_name "CreateCaseStudySearch"

      argument :articles, [ID], required: false
      argument :business_type, String, required: false
      argument :goals, [String], required: false
      argument :name, String, required: false
      argument :preferences, [String], required: false

      field :search, Types::CaseStudy::Search, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(**args)
        search = current_account_responsible_for do
          search = ::CaseStudy::Search.create!(
            user: current_user,
            name: args[:name],
            goals: args[:goals],
            preferences: args[:preferences],
            business_type: args[:business_type],
            results: args[:articles]
          )

          skill_ids = ::CaseStudy::Skill.where(article_id: args[:articles]).distinct.pluck(:skill_id)
          ::Skill.where(id: skill_ids).each do |skill|
            ::CaseStudy::Skill.create!(search: search, skill: skill)
          end
          search
        end

        {search: search}
      end
    end
  end
end
