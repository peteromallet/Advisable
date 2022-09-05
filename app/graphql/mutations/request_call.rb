# frozen_string_literal: true

module Mutations
  class RequestCall < Mutations::BaseMutation
    argument :accounts, [ID], required: true
    argument :article, ID, required: false
    argument :message, String, required: false

    field :interview, Types::Interview, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      article = ::CaseStudy::Article.find_by(uid: args[:article]) if args[:article]
      other_accounts = Array(args[:accounts]).map { |uid| Account.find_by!(uid:) }
      accounts = [current_user.account, *other_accounts].compact.uniq
      interview = Interview.create!(status: "Call Requested", requested_by: current_user.account, accounts:, article:)
      message = interview.conversation.new_message!(author: current_user.account, content: args[:message], kind: "InterviewRequest", interview:, send_emails: false)
      SlackMessageJob.perform_later(channel: "client_activity", text: "#{current_user.account.name_with_company} has requested a call with #{other_accounts.map(&:name_with_company).to_sentence}. (<https://advisable.com/toby/interviews/#{interview.id}|View in Toby>)")
      other_accounts.each { |account| AccountMailer.interview_request(account, interview, current_user.account, message).deliver_later }
      track_event("Requested Consultation", {other_accounts: args[:accounts]})

      {interview:}
    end
  end
end
