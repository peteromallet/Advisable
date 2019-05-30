# Due to how graphql-ruby expects classes to end in "Type" we have to use the
# awkward name SetTypeForProject rather than SetProjectType.
class Mutations::SetTypeForProject < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :project_type, String, required: true
  argument :monthly_limit, Int, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(application:, project_type:,monthly_limit:)
    ap = Application.find_by_airtable_id!(application)
    policy = ApplicationPolicy.new(context[:current_user], ap)
    return true if policy.is_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(application:, project_type:, monthly_limit:)
    unless ['Fixed', 'Flexible'].include?(project_type)
      return { errors: [{ code: "invalidProjectType" }] }
    end

    ap = Application.find_by_airtable_id(application)
    ap.update_attributes(project_type: project_type, monthly_limit: monthly_limit)
    ap.sync_to_airtable
    { application: ap }
  end
end
