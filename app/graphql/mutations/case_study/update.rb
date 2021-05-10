# frozen_string_literal: true

module Mutations
  module CaseStudy
    class Update < Mutations::BaseMutation
      description "Update a Case Study."
      graphql_name "UpdateCaseStudy"

      argument :id, ID, required: true
      argument :sections, [GraphQL::Types::JSON], required: true

      field :article, Types::CaseStudy::Article, null: false

      def authorized?(id:, **_extra)
        article = ::CaseStudy::Article.find_by!(uid: id)
        policy = ::CaseStudy::ArticlePolicy.new(current_user, article)
        return true if policy.update?

        ApiError.not_authorized("You do not have permissions to update this Case Study!")
      end

      def resolve(id:, sections:)
        article = ::CaseStudy::Article.find_by!(uid: id)

        ActiveRecord::Base.transaction do
          sections.each_with_index do |sec, i|
            section = sec["id"] ? article.sections.find_by!(uid: sec["id"]) : article.sections.build
            section.update(position: i, type: sec["type"])
            sec["content"].each_with_index do |con, j|
              content = con["id"] ? section.contents.find_by!(uid: con["id"]) : section.contents.build
              content.position = j
              content = content.becomes!("CaseStudy::#{con["type"].capitalize}Content".constantize)
              if content.is_a?(::CaseStudy::ImagesContent)
                content.images = []
                con["content"]["images"].each do |signed_id|
                  content.images.attach(signed_id)
                end
              else
                content.content = con["content"]
              end
              content.save!
            end
          end
        end

        {article: article}
      end
    end
  end
end
