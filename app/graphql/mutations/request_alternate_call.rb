# frozen_string_literal: true

module Mutations
  class RequestAlternateCall < Mutations::BaseMutation
    argument :availability, [String], required: true, description: "An array of ISO strings"
    argument :interview, ID, required: true
    argument :reason, String, required: false

    field :interview, Types::Interview, null: true

    def authorized?(interview:, **_args)
      requires_current_user!
      interview = Interview.find_by!(uid: interview)
      policy = InterviewPolicy.new(current_user, interview)
      ApiError.not_authorized("You do not have permission to decline this interview") unless policy.decline?
      ApiError.invalid_request("CANNOT_DECLINE", "Interview is not in a declinable state") unless Interview::DECLINABLE_STATUSES.include?(interview.status)
      true
    end

    def resolve(interview:, availability:, reason: nil)
      interview = Interview.find_by!(uid: interview)
      interview.decline!(current_user.account, reason, send_emails: false)
      current_account_responsible_for { current_user.account.update!(availability:) }

      alternate = Interview.create!(status: "Call Requested", requested_by: current_user.account, accounts: interview.accounts)
      alternate.conversation.new_message!(author: current_user.account, kind: "InterviewRequest", interview: alternate, send_emails: false)
      other_accounts = interview.accounts - [current_user.account]
      SlackMessageJob.perform_later(channel: "consultation_requests", text: "#{current_user.account.name_with_company} has requested an alternate call with #{other_accounts.map(&:name_with_company).to_sentence}. (<https://app.advisable.com/toby/interviews/#{alternate.id}|View in Toby>)")
      other_accounts.each { |account| AccountMailer.alternate_interview_request(account, alternate, current_user.account, reason).deliver_later }
      {interview: alternate}
    end
  end
end
