# frozen_string_literal: true

module Mutations
  module CaseStudy
    class UpdateSearch < Mutations::BaseMutation
      description "Update an existing Case Study Search."
      graphql_name "UpdateCaseStudySearch"

      argument :business_type, String, required: false
      argument :goals, [String], required: false
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :primary_skill, String, required: false
      argument :skills, [String], required: false

      field :search, Types::CaseStudy::Search, null: false

      def authorized?(id:, **_args)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: id)
        policy = ::CaseStudy::SearchPolicy.new(current_user, search)
        return true if policy.update?

        ApiError.not_authorized("You do not have permission to update this search")
      end

      def resolve(id:, **args)
        search = ::CaseStudy::Search.find_by!(uid: id)

        current_account_responsible_for do
          args.except(:skills, :primary_skill).each do |key, value|
            next if value.blank?

            search.public_send("#{key}=", value)
          end

          if args[:skills].present?
            search.skills = []
            args[:skills].each do |skill|
              ::CaseStudy::Skill.create!(
                search: search,
                primary: args[:primary_skill] == skill,
                skill: ::Skill.find_by!(name: skill)
              )
            end
          end

          search.save
        end

        {search: search}
      end
    end
  end
end
