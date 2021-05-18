# frozen_string_literal: true

module Types
  module CaseStudy
    class Skill < Types::BaseType
      graphql_name "CaseStudySkill"
      description "Type definition for CaseStudy::Skill"

      field :id, ID, null: false, method: :uid
      field :primary, Boolean, null: true
      field :article, Article, null: false
      field :skill, Types::Skill, null: false
    end
  end
end
