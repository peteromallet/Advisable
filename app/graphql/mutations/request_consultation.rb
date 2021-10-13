# frozen_string_literal: true

module Mutations
  class RequestConsultation < Mutations::BaseMutation
    description "Request a consultation"

    argument :message, String, required: true
    argument :specialist, ID, required: true

    field :consultation, Types::ConsultationType, null: false

    def authorized?(**_args)
      requires_client!
    end

    def resolve(**args)
      specialist = Specialist.find_by!(uid: args[:specialist])

      conversation = Conversation.by_accounts([specialist.account, current_user.account])

      consultation = current_user.consultations.create!(
        status: "Request Completed",
        specialist: specialist,
        skill: specialist.articles.first&.skills&.primary&.first&.skill
      )

      conversation.messages.create!(
        consultation: consultation,
        content: args[:message],
        author: current_user.account
      )

      {consultation: consultation}
    end
  end
end
