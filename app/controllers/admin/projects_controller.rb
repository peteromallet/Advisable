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

    def update
      super

      if params[:primary_skill_id]
        requested_resource.project_skills.where(primary: true).update_all(primary: false) # rubocop:disable Rails/SkipsModelValidations
        project_skill = requested_resource.project_skills.find_by(skill_id: params[:primary_skill_id])
        project_skill.update(primary: true)
      end

      requested_resource.sync_to_airtable
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
