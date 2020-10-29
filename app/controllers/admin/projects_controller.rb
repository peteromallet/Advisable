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
        skill = Skill.find(params[:primary_skill_id])
        requested_resource.primary_skill = skill
        requested_resource.save
      end
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
