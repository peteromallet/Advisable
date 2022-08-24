# frozen_string_literal: true

module Admin
  class ContentsController < AdminController
    before_action :set_content

    RESULT_CATEGORIES = %w[revenue impact-1 impact-2 impact-3 multiply-1 multiply-2 creative strategy launch optimise].freeze

    def edit
      render partial: "admin/contents/edit", locals: {content: @content}
    end

    def update
      if @content.update(content_params)
        render partial: "admin/contents/base", locals: {content: @content}
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def move
      @content.move_to!(params[:position].to_i)
      head :ok
    end

    def remove_image
      image = @content.images.find(params[:image_id])
      image.purge
      render turbo_stream: turbo_stream.remove(image)
    end

    private

    def set_content
      @content = CaseStudy::Content.find(params[:id])
    end

    def content_params
      case @content
      when CaseStudy::ParagraphContent
        {content: {text: params[:text]}}
      when CaseStudy::HeadingContent
        {content: {text: params[:text], size: params[:size]}}
      when CaseStudy::ResultsContent
        {content: {results: params[:results].reject { |r| r.values.all?(&:blank?) }}}
      when CaseStudy::ImagesContent
        if params[:images].present?
          params[:images].each do |image|
            @content.images.attach(image)
          end
        end
        {}
      end
    end
  end
end
