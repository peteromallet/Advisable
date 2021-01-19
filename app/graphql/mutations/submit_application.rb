# frozen_string_literal: true

# Used to update an application record during the application process.
class Mutations::SubmitApplication < Mutations::BaseMutation
  argument :id, ID, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(id:, **args)
    requires_specialist!

    application = Application.find_by!(uid: id)
    return true if current_user == application.specialist

    raise ApiError::InvalidRequest.new("invalidApplication", "The application does not belong to signed in user.")
  end

  def resolve(id:)
    application = Application.find_by_uid_or_airtable_id!(id)
    application = Applications::Submit.call(application, current_account_id: current_account_id)
    {application: application}
  rescue Service::Error => e
    ApiError.service_error(e)
  end
end
