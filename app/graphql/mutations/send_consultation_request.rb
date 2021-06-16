# frozen_string_literal: true

module Mutations
  class SendConsultationRequest < Mutations::BaseMutation
    argument :consultation, ID, required: true
    argument :likely_to_hire, Integer, required: true

    field :consultation, Types::ConsultationType, null: true

    def authorized?(consultation:, **_args)
      requires_client!

      consultation = Consultation.find_by_uid_or_airtable_id!(consultation)
      ConsultationPolicy.new(current_user, consultation).send_request?
    end

    def resolve(**args)
      consultation = Consultation.find_by_uid_or_airtable_id!(args[:consultation])
      consultation.update(status: 'Request Completed', likely_to_hire: args[:likely_to_hire])
      {consultation: consultation}
    end
  end
end
