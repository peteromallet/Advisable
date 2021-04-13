# frozen_string_literal: true

module Types
  module CaseStudy
    class SkillType < Types::BaseType
      graphql_name "CaseStudySkill"
      description "Type definition for CaseStudy::Skill"

      field :id, ID, null: false
      field :primary, Boolean, null: true
      field :article, ArticleType, null: true
      field :skill, Skill, null: true
    end
  end
end
