class Types::MutationType < GraphQL::Schema::Object
  field :start_working, mutation: Mutations::StartWorking
  field :send_proposal, mutation: Mutations::SendProposal
  field :create_proposal, mutation: Mutations::CreateProposal
  field :update_proposal, mutation: Mutations::UpdateProposal
  field :accept_proposal, mutation: Mutations::AcceptProposal

  field :accept_booking, mutation: Mutations::AcceptBooking
  field :decline_booking, mutation: Mutations::DeclineBooking
  field :update_application_status, mutation: Mutations::UpdateApplicationStatus

  field :request_introduction, mutation: Mutations::RequestIntroduction
  field :accept_interview_request, mutation: Mutations::AcceptInterviewRequest
  field :request_more_interview_times, mutation: Mutations::RequestMoreInterviewTimes
  field :resend_interview_request, mutation: Mutations::ResendInterviewRequest
  field :request_references, mutation: Mutations::RequestReferences

  field :reject_proposal, mutation: Mutations::RejectProposal
  field :reject_application, mutation: Mutations::RejectApplication
  field :reject_application_invitation, mutation: Mutations::RejectApplicationInvitation
  field :update_application, mutation: Mutations::UpdateApplication
  field :submit_application, mutation: Mutations::SubmitApplication

  field :update_availability, mutation: Mutations::UpdateAvailability

  field :create_payment, mutation: Mutations::CreatePayment

  field :create_project, mutation: Mutations::CreateProject
  field :update_project, mutation: Mutations::UpdateProject
  field :confirm_project, mutation: Mutations::ConfirmProject
  field :convert_to_self_service, mutation: Mutations::ConvertToSelfService
  field :create_off_platform_project, mutation: Mutations::CreateOffPlatformProject

  field :login, mutation: Mutations::Login
  field :signup, mutation: Mutations::Signup
  field :confirm_account, mutation: Mutations::ConfirmAccount
  field :resend_confirmation_email, mutation: Mutations::ResendConfirmationEmail
  field :request_password_reset, mutation: Mutations::RequestPasswordReset
  field :reset_password, mutation: Mutations::ResetPassword

  field :update_profile, mutation: Mutations::UpdateProfile

  field :create_task, mutation: Mutations::CreateTask
  field :update_task, mutation: Mutations::UpdateTask
  field :delete_task, mutation: Mutations::DeleteTask
  field :request_quote, mutation: Mutations::RequestQuote
end
