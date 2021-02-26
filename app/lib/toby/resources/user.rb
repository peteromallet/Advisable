# frozen_string_literal: true

module Toby
  module Resources
    class User < BaseResource
      model_name ::User
      attribute :uid, Attributes::String
      attribute :account, Attributes::BelongsTo
      attribute :application_status, Attributes::Select, options: ["Accepted", "Invited", "Active", "Access Granted"]
    end
  end
end
