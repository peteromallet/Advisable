# frozen_string_literal: true

module Mutations
  class InviteUserToInterview < Mutations::BaseMutation
    include Mutations::Helpers::Account

    argument :email, String, required: true
    argument :first_name, String, required: false
    argument :interview_id, ID, required: true
    argument :last_name, String, required: false

    field :user, Types::User, null: true

    def authorized?(interview_id:, **_args)
      requires_client!

      interview = Interview.find_by!(uid: interview_id)
      policy = InterviewPolicy.new(current_user, interview)
      return true if policy.invite_user?

      ApiError.not_authorized("You do not have permission to invite users to this interview.")
    end

    def resolve(interview_id:, email:, **args)
      invited_user = find_or_create_user_by_email!(email, args)
      interview = Interview.find_by!(uid: interview_id)
      UserMailer.invited_to_interview(current_user, invited_user, interview).deliver_later

      {user: invited_user}
    end
  end
end
