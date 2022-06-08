# frozen_string_literal: true

module Mutations
  class RequestCall < Mutations::BaseMutation
    argument :accounts, [ID], required: true
    argument :message, String, required: false

    field :interview, Types::Interview, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      other_accounts = Array(args[:accounts]).map { |uid| Account.find_by!(uid:) }
      accounts = [current_user.account]
      accounts += other_accounts
      accounts = accounts.compact.uniq
      interview = Interview.create!(status: "Call Requested", accounts:)
      message = Conversation.by_accounts(accounts).new_message!(author: current_user.account, content: args[:message], kind: "InterviewRequest", interview:, send_emails: false)

      SlackMessageJob.perform_later(channel: "consultation_requests", text: "#{current_user.account.name_with_company} has requested a call with #{other_accounts.map(&:name_with_company).to_sentence}. (<https://app.advisable.com/toby/interviews/#{interview.id}|View in Toby>)")
      other_accounts.each { |account| AccountMailer.interview_request(account, interview, current_user.account, message).deliver_later }
      track_event("Requested Consultation", {other_accounts: args[:accounts]})

      {interview:}
    end
  end
end
