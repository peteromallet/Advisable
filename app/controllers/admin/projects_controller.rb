module Admin
  class ProjectsController < Admin::ApplicationController
    # To customize the behavior of this controller,
    # you can overwrite any of the RESTful actions. For example:
    #
    # def index
    #   super
    #   @resources = Project.
    #     page(params[:page]).
    #     per(10)
    # end

    def create
      resource = resource_class.new(resource_params)
      authorize_resource(resource)

      if resource.save
        update_primary_skill(resource)
        resource.sync_to_airtable
        redirect_to(
          [namespace, resource],
          notice: translate_with_resource("create.success")
        )
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, resource),
        }
      end
    end

    def update
      super
      update_primary_skill(requested_resource)
      requested_resource.sync_to_airtable
    end

    private

    def update_primary_skill(resource)
      return if params[:primary_skill_id].blank?

      resource.project_skills.where(primary: true).update_all(primary: false) # rubocop:disable Rails/SkipsModelValidations
      resource.project_skills.find_by(skill_id: params[:primary_skill_id]).update(primary: true)
    end

    # Define a custom finder by overriding the `find_resource` method:
    # def find_resource(param)
    #   Project.find_by!(slug: param)
    # end

    # See https://administrate-prototype.herokuapp.com/customizing_controller_actions
    # for more information

    def resource_params
      params.require(:project).permit(
        *dashboard.permitted_attributes,
        skill_ids: [],
        goals: [],
        questions: [],
        required_characteristics: [],
        characteristics: []
      )
    end
  end
end
