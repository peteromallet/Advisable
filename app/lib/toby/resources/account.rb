# frozen_string_literal: true

module Toby
  module Resources
    class Account < BaseResource
      model_name ::Account
      attribute :uid, Attributes::String, readonly: true
      attribute :first_name, Attributes::String
      attribute :last_name, Attributes::String
      attribute :name, Attributes::String, readonly: true
      attribute :email, Attributes::String
      attribute :user, Attributes::HasOne, labeled_by: :uid, column_label: "User UID"
      attribute :specialist, Attributes::HasOne, labeled_by: :uid
      attribute :permissions, Attributes::TextArray
      attribute :unsubscribed_from, Attributes::TextArray
    end
  end
end
