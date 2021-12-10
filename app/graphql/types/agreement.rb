# frozen_string_literal: true

module Types
  class Agreement < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :user, Types::User, null: false
    field :company, Types::CompanyType, null: false
    field :specialist, Types::SpecialistType, null: false
    field :status, String, null: false
    field :collaboration, String, null: true
    field :invoicing, String, null: true
    field :hourly_rate, Integer, null: true
  end
end
