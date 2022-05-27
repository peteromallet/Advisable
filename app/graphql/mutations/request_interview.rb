# frozen_string_literal: true

module Mutations
  class RequestInterview < Mutations::BaseMutation
    argument :accounts, [ID], required: false
    argument :article, ID, required: false
    argument :message, String, required: true
    argument :specialist, ID, required: false, deprecation_reason: "Do this via accounts array"

    field :interview, Types::Interview, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      article = ::CaseStudy::Article.find_by(uid: args[:article]) if args[:article]
      accounts = Array(args[:accounts]).map { |uid| Account.find_by!(uid:) }
      accounts += [Specialist.find_by(uid: args[:specialist])&.account, current_user.account]
      accounts = accounts.compact.uniq
      interview = Interview.create!(status: "Call Requested", accounts:, article:)
      Conversation.by_accounts(accounts).new_message!(author: current_user.account, content: args[:message], kind: "InterviewRequest", interview:, send_emails: false)

      if interview.specialist_and_user?
        Slack.bg_message(channel: "consultation_requests", text: "We have a new interview request for #{interview.specialist.account.name} from #{interview.user.name_with_company}.")
        SpecialistMailer.interview_request(interview).deliver_later
        ::Analytics.bg_track(interview.user, "Requested Consultation", {specialist: interview.specialist.uid})
      end

      {interview:}
    end
  end
end
