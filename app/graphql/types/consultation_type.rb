# frozen_string_literal: true

module Types
  class ConsultationType < Types::BaseType
    field :id, ID, null: false
    field :status, String, null: true
    field :topic, String, null: true
    field :user, Types::User, null: false
    field :specialist, Types::SpecialistType, null: false
    field :interview, Types::Interview, null: true
    field :viewer_is_specialist, Boolean, null: true

    def id
      object.uid
    end

    def viewer_is_specialist
      object.specialist == current_user
    end
  end
end
