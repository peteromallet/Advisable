# frozen_string_literal: true

require "matrix"

module Admin
  class ArticlesController < AdminController
    before_action :set_article, only: %i[show edit update destroy]
    before_action :form_vars, only: %i[new edit]

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

    def show; end

    def new
      @article = CaseStudy::Article.new
    end

    def edit; end

    def create
      @article = CaseStudy::Article.new(article_params)

      if @article.save
        redirect_to admin_article_path(@article), notice: "Article was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
      if @article.update(article_params)
        redirect_to admin_article_path(@article), notice: "Article was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @article.destroy
      redirect_to admin_articles_path, notice: "Article was successfully destroyed.", status: :see_other
    end

    private

    def set_article
      @article = CaseStudy::Article.find(params[:id])
    end

    def form_vars
      @specialists = Specialist.includes(:account).map { |s| [s.account.name, s.id] }
      @interviewers = Account.where(email: SalesPerson.select(:email)).map { |a| [a.name, a.id] }
    end

    def article_params
      params.require(:case_study_article).permit(:specialist_id, :interviewer_id, :title, :subtitle, :comment, :editor_note, :goals, :score, :confidential, :targeting, :published_at, :hide_from_search, company_type: [])
    end
  end
end