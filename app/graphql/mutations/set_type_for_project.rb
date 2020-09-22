# Due to how graphql-ruby expects classes to end in "Type" we have to use the
# awkward name SetTypeForProject rather than SetProjectType. A better name might
# be SetProjectTypeForAplication as we are actually modifying the application
# record in this case.
class Mutations::SetTypeForProject < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :project_type, String, required: true
  argument :monthly_limit, Int, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(application:, project_type:, monthly_limit:)
    ap = Application.find_by_uid_or_airtable_id!(application)
    policy = ApplicationPolicy.new(context[:current_user], ap)
    return true if policy.is_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(application:, project_type:, monthly_limit:)
    unless ['Fixed', 'Flexible'].include?(project_type)
      return { errors: [{ code: "invalidProjectType" }] }
    end

    ap = Application.find_by_uid_or_airtable_id!(application)
    ap.update(project_type: project_type, monthly_limit: monthly_limit)

    if project_type == "Flexible" && (ap.saved_change_to_project_type? || ap.saved_change_to_monthly_limit?)
      Applications::FlexibleInvoice.call(application: ap)
    end

    ap.sync_to_airtable
    { application: ap }
  end
end
