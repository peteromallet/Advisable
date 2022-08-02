# frozen_string_literal: true

module Admin
  class TopicsController < AdminController
    before_action :set_topic, only: %i[edit update destroy move move_result remove_result]
    before_action :fetch_icons, only: %i[new edit]

    def index
      @topics = CaseStudy::Topic.by_position
    end

    def new
      @topic = CaseStudy::Topic.new
    end

    def edit; end

    def create
      @topic = CaseStudy::Topic.new(admin_topic_params)

      if @topic.save
        redirect_to admin_topics_path, notice: "Topic was successfully created."
      else
        fetch_icons
        render :new, status: :unprocessable_entity
      end
    end

    def update
      if @topic.update(admin_topic_params)
        redirect_to admin_topics_path, notice: "Topic was successfully updated."
      else
        fetch_icons
        render :edit, status: :unprocessable_entity
      end
    end

    def move
      @topic.move_to!(params[:position].to_i)
      head :ok
    end

    def move_result
      @topic.move_result_to!(params[:result].to_i, params[:position].to_i)
    end

    def remove_result
      @topic.update!(result_ids: @topic.result_ids.without(params[:result].to_i))
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.remove("case_study_article_#{params[:result]}") }
        format.html { redirect_to edit_admin_topic_path(@topic) }
      end
    end

    def destroy
      @topic.destroy
      redirect_to admin_topics_path, notice: "Topic was successfully deleted."
    end

    private

    def fetch_icons
      client = Aws::S3::Client.new
      objects = client.list_objects(prefix: "topic-icons/", bucket: ENV.fetch("AWS_S3_BUCKET", nil))
      @icons = objects.contents.filter_map do |o|
        next unless o.key.ends_with?(".svg")

        [o.key[%r{topic-icons/(.*)\.svg}, 1], o.key]
      end
    end

    def set_topic
      @topic = CaseStudy::Topic.find(params[:id])
    end

    def admin_topic_params
      params.require(:case_study_topic).permit(:name, :description, :icon)
    end
  end
end
