# frozen_string_literal: true

module Mutations
  class ReportUnresponsiveness < Mutations::BaseMutation
    argument :application_id, ID, required: true
    argument :message, String, required: true

    field :success, Boolean, null: true

    def authorized?(application_id:, **_args)
      requires_current_user!
      application = Application.find_by!(uid: application_id)

      return true if (current_user.is_a?(::Specialist) && application.specialist == current_user) || (current_user.is_a?(::User) && current_user == application.project.user)

      ApiError.invalid_request("INVALID_APPLICATION", "The application does not belong to signed in user.")
    end

    def resolve(application_id:, message:)
      application = Application.find_by!(uid: application_id)
      report = UnresponsivenessReport.create!(application: application, message: message, reporter: current_user.account)

      if current_user.is_a?(Specialist)
        StaffMailer.unresponsive_client(report).deliver_later
      else
        StaffMailer.unresponsive_specialist(report).deliver_later
      end

      {success: true}
    end
  end
end
