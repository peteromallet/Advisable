# frozen_string_literal: true

module Mutations
  class FlagProblematicSpecialist < Mutations::BaseMutation
    argument :application_id, ID, required: true
    argument :message, String, required: true

    field :success, Boolean, null: true

    def authorized?(application_id:, message:)
      requires_client!

      application = Application.find_by!(uid: application_id)
      return true if current_user == application.project.user

      ApiError.invalid_request("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(application_id:, message:)
      application = Application.find_by!(uid: application_id)
      flag = ProblematicFlag.create!(application: application, message: message, user: current_user)
      StaffMailer.problematic_specialist(flag).deliver_later
      {success: true}
    end
  end
end
