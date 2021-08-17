# frozen_string_literal: true

module Types
  module CaseStudy
    class Skill < Types::BaseType
      graphql_name "CaseStudySkill"
      description "Type definition for CaseStudy::Skill"

      field :id, ID, null: false, method: :uid
      field :primary, Boolean, null: true

      field :article, Article, null: false
      def article
        dataloader.with(::ActiveRecordSource, ::CaseStudy::Article).load(object.article_id)
      end

      field :skill, Types::Skill, null: false
      def skill
        dataloader.with(::ActiveRecordSource, ::Skill).load(object.skill_id)
      end
    end
  end
end
