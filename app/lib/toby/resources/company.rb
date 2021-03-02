# frozen_string_literal: true

module Toby
  module Resources
    class Company < BaseResource
      model_name ::Company
      attribute :name, Attributes::String
      attribute :bank_transfers_enabled, Attributes::Boolean
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
