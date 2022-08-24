# frozen_string_literal: true

module Admin
  class ContentsController < AdminController
    before_action :set_content

    def edit
      render partial: "admin/contents/base_form", locals: {content: @content}
    end

    def update
      if @case_study_content.update(case_study_content_params)
        redirect_to @case_study_content, notice: "Content was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def move
      @content.move_to!(params[:position].to_i)
      head :ok
    end

    private

    def set_content
      @content = CaseStudy::Content.find(params[:id])
    end

    def case_study_content_params
      params.fetch(:case_study_content, {})
    end
  end
end
