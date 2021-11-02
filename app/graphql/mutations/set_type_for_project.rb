# frozen_string_literal: true

# Due to how graphql-ruby expects classes to end in "Type" we have to use the
# awkward name SetTypeForProject rather than SetProjectType. A better name might
# be SetProjectTypeForAplication as we are actually modifying the application
# record in this case.
module Mutations
  class SetTypeForProject < Mutations::BaseMutation
    description "Set the project type for a project"

    argument :application, ID, required: true
    argument :monthly_limit, Int, required: false
    argument :project_type, String, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(application:, **_args)
      ap = Application.find_by!(uid: application)
      policy = ApplicationPolicy.new(current_user, ap)
      return true if policy.set_type_for_project?

      ApiError.not_authorized("You do not have permission to approve this task")
    end

    def resolve(application:, project_type:, monthly_limit:)
      ApiError.invalid_request("INVALID_PROJECT_TYPE", "Project type is not valid.") if %w[Fixed Flexible].exclude?(project_type)

      ap = Application.find_by!(uid: application)
      current_account_responsible_for do
        ap.update(project_type: project_type, monthly_limit: monthly_limit)
      end
      {application: ap}
    end
  end
end
