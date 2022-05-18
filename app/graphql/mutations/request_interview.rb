# frozen_string_literal: true

module Mutations
  class RequestInterview < Mutations::BaseMutation
    argument :article, ID, required: false
    argument :message, String, required: true
    argument :specialist, ID, required: true

    field :interview, Types::Interview, null: false

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      specialist = Specialist.find_by!(uid: args[:specialist])
      conversation = Conversation.by_accounts([specialist.account, current_user.account])
      article = ::CaseStudy::Article.find_by(uid: args[:article]) if args[:article]
      interview = Interview.create(status: "Call Requested", user: current_user, specialist:, article:)

      conversation.new_message!(author: current_user.account, content: args[:message], kind: "InterviewRequest", interview:, send_emails: false)
      Slack.bg_message(channel: "consultation_requests", text: "We have a new interview request for #{specialist.account.name} from #{current_user.name_with_company}.")
      SpecialistMailer.interview_request(interview).deliver_later
      ::Analytics.track(current_user, "Requested Consultation", {specialist: specialist.uid})

      {interview:}
    end
  end
end
