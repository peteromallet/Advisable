# frozen_string_literal: true

require "matrix"

module Admin
  class ArticlesController < AdminController
    before_action :set_article, only: %i[show edit update destroy]

    include Pagy::Backend

    def index
      @pagy, @articles = pagy(::CaseStudy::Article.reverse_chronological)
    end

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

    # GET /articles/1
    def show; end

    # GET /articles/new
    def new
      @article = CaseStudy::Article.new
    end

    # GET /articles/1/edit
    def edit; end

    # POST /articles
    def create
      @article = CaseStudy::Article.new(article_params)

      if @article.save
        redirect_to @article, notice: "Article was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /articles/1
    def update
      if @article.update(article_params)
        redirect_to @article, notice: "Article was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    # DELETE /articles/1
    def destroy
      @article.destroy
      redirect_to articles_url, notice: "Article was successfully destroyed."
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = CaseStudy::Article.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def article_params
      params.fetch(:article, {})
    end
  end
end
