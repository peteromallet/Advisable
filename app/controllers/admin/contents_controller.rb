# frozen_string_literal: true

module Admin
  class ContentsController < AdminController
    include AsSpecialist

    attr_reader :content, :section

    before_action :set_content, except: %i[new create]
    before_action :set_section, only: %i[new create]
    skip_before_action :admin?
    before_action :admin_or_as_specialist?

    RESULT_CATEGORIES = %w[revenue impact-1 impact-2 impact-3 multiply-1 multiply-2 creative strategy launch optimise].freeze

    def edit
      render partial: "admin/contents/edit", locals: {content:}
    end

    def new
      @content = CaseStudy::Content.new(section:, type: params[:type])
      render partial: "admin/contents/new", locals: {section:, content:}
    end

    def create
      @content = CaseStudy::Content.new(section:, type: params[:type])
      position = (section.contents.by_position.last&.position || 0) + 1
      content.assign_attributes(**content_params, position:)

      if content.save
        render turbo_stream: turbo_stream.replace(section, partial: "admin/articles/section", locals: {section:})
      else
        render partial: "admin/contents/new", locals: {section:, content:}, status: :unprocessable_entity
      end
    end

    def update
      if content.update(content_params)
        render partial: "admin/contents/base", locals: {content:}
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      content.destroy
      render turbo_stream: turbo_stream.replace(content.section, partial: "admin/articles/section", locals: {section: content.section})
    end

    def move
      content.move_to!(params[:position].to_i)
      head :ok
    end

    def remove_image
      image = content.images.find(params[:image_id])
      image.purge
      render turbo_stream: turbo_stream.remove(image)
    end

    private

    def set_content
      @content = CaseStudy::Content.find(params[:id])
    end

    def set_section
      @section = CaseStudy::Section.find(params[:section_id])
    end

    def article
      (content&.section || @section).article
    end

    def content_params
      case content
      when CaseStudy::ParagraphContent
        {content: {text: params[:text]}}
      when CaseStudy::HeadingContent
        {content: {text: params[:text], size: params[:size]}}
      when CaseStudy::ResultsContent
        {content: {results: params[:results].reject { |r| r.values.all?(&:blank?) }}}
      when CaseStudy::PodcastContent
        {content: {url: params[:url]}}
      when CaseStudy::ImagesContent
        if params[:images].present?
          params[:images].each do |image|
            content.images.attach(image)
          end
        end
        {}
      end
    end
  end
end
