# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateSearch < Mutations::BaseMutation
      description "Create a Case Study Search as the current User."
      graphql_name "CreateCaseStudySearch"

      argument :business_type, String, required: false
      argument :goals, [String], required: false
      argument :name, String, required: false
      argument :primary_skill, String, required: false
      argument :skills, [String], required: true

      field :search, Types::CaseStudy::Search, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(skills:, **args)
        search = current_account_responsible_for do
          search = ::CaseStudy::Search.create!(
            user: current_user,
            name: args[:name],
            goals: args[:goals],
            business_type: args[:business_type]
          )

          skills.each do |skill|
            ::CaseStudy::Skill.create!(
              search: search,
              primary: args[:primary_skill] == skill,
              skill: ::Skill.find_by!(name: skill)
            )
          end

          search
        end

        {search: search}
      end
    end
  end
end
