# frozen_string_literal: true

require "matrix"

class ArticlesController < ApplicationController
  before_action :admin?

  layout "admin"

  def search
    @query = params[:query]

    return if @query.blank?

    articles = ::CaseStudy::Article.searchable

    if params[:skill_category].present?
      category = ::SkillCategory.find(params[:skill_category])
      skill_ids = category.skills_with_similar.pluck(:id)
      cs_skills = ::CaseStudy::Skill.where(skill_id: skill_ids)
      articles = articles.where(skills: cs_skills)
    end

    data = OpenAiInteractor.new.query_embedding_for(@query)
    query_vector = Vector.elements(data)
    @results = []
    CaseStudy::Embedding.where(article: articles).includes(:article).each do |embedding|
      @results << {
        similarity: (embedding.cosine_similarity_with(query_vector) * 100).round(3),
        article: embedding.article
      }
    end
    @results = @results.sort_by { |r| r[:similarity] }.reverse
  end
end
