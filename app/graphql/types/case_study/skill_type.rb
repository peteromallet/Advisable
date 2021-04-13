# frozen_string_literal: true

module Types
  module CaseStudy
    class SkillType < Types::BaseType
      graphql_name "CaseStudySkill"
      description "Type definition for CaseStudy::Skill"

      field :id, ID, null: false
      field :primary, Boolean, null: true
      field :article, ArticleType, null: false
      field :skill, Skill, null: false
    end
  end
end
