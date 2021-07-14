# frozen_string_literal: true

module Types
  class Payment < Types::BaseType
    description "Type for Payment model"

    field :id, ID, null: false, method: :uid
    field :status, String, null: true
    field :amount, Int, null: false
    field :admin_fee, Int, null: false

    field :payment_intent, PaymentIntentType, null: false
    def payment_intent
      Stripe::PaymentIntent.retrieve(object.payment_intent_id)
    end

    field :company, CompanyType, null: false
    field :specialist, SpecialistType, null: false
    field :task, TaskType, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
