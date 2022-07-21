# frozen_string_literal: true

module Admin
  class TopicsController < AdminController
    before_action :set_topic, only: %i[show edit update destroy move]

    def index
      @topics = CaseStudy::Topic.by_position
    end

    def show; end

    def new
      @topic = CaseStudy::Topic.new
    end

    def edit; end

    def create
      @topic = CaseStudy::Topic.new(admin_topic_params)

      if @topic.save
        redirect_to @topic, notice: "Topic was successfully created."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def move
      @topic.move_to!(params[:position])
      head :ok
    end

    def update
      if @topic.update(admin_topic_params)
        redirect_to @topic, notice: "Topic was successfully updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @topic.destroy
      redirect_to admin_topics_url, notice: "Topic was successfully destroyed."
    end

    private

    def set_topic
      @topic = CaseStudy::Topic.find(params[:id])
    end

    def admin_topic_params
      params.fetch(:admin_topic, {})
    end
  end
end
