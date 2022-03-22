# frozen_string_literal: true

require "matrix"

class ArticlesController < ApplicationController
  before_action :admin?

  layout "tailwind"

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

    client = OpenAI::Client.new
    query = client.embeddings(engine: "text-search-#{CaseStudy::Embedding::ENGINE}-query-001", parameters: {input: @query})
    data = query["data"].first["embedding"]
    query_vector = Vector.elements(data)
    @results = []
    CaseStudy::Embedding.where(article: articles).includes(:article).each do |embedding|
      @results << {
        similarity: (embedding.cosine_similarity_to(query_vector) * 100).round(3),
        article: embedding.article
      }
    end
    @results = @results.sort_by { |r| r[:similarity] }.reverse
  end
end
