# frozen_string_literal: true

module Types
  class ConsultationType < Types::BaseType
    def self.authorized?(consultation, context)
      policy = ConsultationPolicy.new(context[:current_user], consultation)
      ApiError.not_authorized("You do not have permission to view this Consultation") unless policy.read?
      super
    end

    field :status, String, null: true
    field :topic, String, null: true
    field :user, Types::User, null: false
    field :specialist, Types::SpecialistType, null: false
    field :interview, Types::Interview, null: true
    field :id, ID, null: false, method: :uid
    field :message, Types::ConsultationRequestMessage, null: false

    field :viewer_is_specialist, Boolean, null: true
    def viewer_is_specialist
      object.specialist == current_user
    end
  end
end
