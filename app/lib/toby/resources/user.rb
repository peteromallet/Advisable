# frozen_string_literal: true

module Toby
  module Resources
    class User < BaseResource
      model_name ::User
      attribute :uid, Attributes::String
      attribute :account, Attributes::BelongsTo, to: :Account, via: :account_id
    end
  end
end
