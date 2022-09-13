# frozen_string_literal: true

module Admin
  class ArticlesController < AdminController
    SPECIALIST_ACTIONS = %i[add_industry add_insight add_skill edit make_skill_primary remove_industry remove_insight remove_skill update].freeze

    include AsSpecialist

    attr_reader :article

    before_action :set_article, except: %i[index search filter new create]
    skip_before_action :admin?, only: SPECIALIST_ACTIONS
    before_action :admin_or_as_specialist?, only: SPECIALIST_ACTIONS

    include Pagy::Backend

    def index
      @pagy, @articles = pagy(::CaseStudy::Article.reverse_chronological)
    end

    def filter
      specialists = Specialist.joins(:account)
      specialists = specialists.where("accounts.first_name ILIKE ?", "%#{params[:title]}%").or(specialists.where("accounts.last_name ILIKE ?", "%#{params[:title]}%"))
      @articles = ::CaseStudy::Article.where("title ILIKE ?", "%#{params[:title]}%").or(::CaseStudy::Article.where(specialist: specialists))
      @articles = @articles.reverse_chronological.includes(specialist: :account)
      @pagy, @articles = pagy_array(@articles, params: {title: params[:title]})
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace(:articles, partial: "admin/articles/articles", locals: {articles: @articles, pagy: @pagy}) }
        format.html { render :index }
      end
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

    def new
      @article = CaseStudy::Article.new
    end

    def create
      @article = CaseStudy::Article.new(article_params)
      article.build_company
      CaseStudy::Section::VALID_TYPES.each.with_index do |type, index|
        article.sections.build(type:, position: index)
      end

      if article.save
        redirect_to edit_admin_article_path(article), notice: "Article was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit; end

    def add_insight
      article.insights.create!(params.require(:case_study_insight).permit(:title, :description))
      render partial: "insights", locals: {article:}
    end

    def remove_insight
      article.insights.find(params[:insight_id]).destroy
      render partial: "insights", locals: {article:}
    end

    def add_industry
      industry_id = params.require(:case_study_industry).permit(:industry)[:industry]
      article.industries.create!(industry_id:) if industry_id.present? && !article.industries.exists?(industry_id:)
      render partial: "industries", locals: {article:}
    end

    def remove_industry
      article.industries.find(params[:industry_id]).destroy
      render partial: "industries", locals: {article:}
    end

    def add_skill
      skill_id = params.require(:case_study_skill).permit(:skill)[:skill]
      article.skills.create!(skill_id:) if skill_id.present? && !article.skills.exists?(skill_id:)
      render partial: "skills", locals: {article:}
    end

    def remove_skill
      article.skills.find(params[:skill_id]).destroy
      render partial: "skills", locals: {article:}
    end

    def make_skill_primary
      article.skills.update_all(primary: false) # rubocop:disable Rails/SkipsModelValidations
      article.skills.find(params[:skill_id]).update(primary: true)
      render partial: "skills", locals: {article:}
    end

    def update
      if article.update(article_params)
        path = current_account.admin? ? edit_admin_article_path(article) : specialist_editor_path(article)
        redirect_to path, notice: "Article was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      article.destroy
      redirect_to admin_articles_path, notice: "Article was successfully destroyed.", status: :see_other
    end

    private

    def set_article
      @article = CaseStudy::Article.find(params[:id])
    end

    def article_params
      params.require(:case_study_article).permit(:title, :subtitle, :score, :published_at, :specialist_id, :confidential, :hide_from_search, company_type: [], company_attributes: %i[id name website business_type favicon])
    end
  end
end
