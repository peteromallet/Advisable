# frozen_string_literal: true

module Types
  class SkillCategory < Types::BaseType
    description "A type for SkillCategory model"

    field :id, ID, null: false, method: :slug
    field :slug, String, null: false
    field :name, String, null: false

    field :articles, Types::CaseStudy::Article.connection_type, null: false
    def articles
      similar_skills = object.skills_with_similar
      cs_skills = ::CaseStudy::Skill.where(skills: similar_skills)
      ::CaseStudy::Article.where(skills: cs_skills).by_score
    end
  end
end
