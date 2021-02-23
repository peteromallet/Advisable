# frozen_string_literal: true

module Toby
  module Resources
    class Application < BaseResource
      model_name ::Application
      attribute :uid, Attributes::String
      attribute :status, Attributes::Select, options: ["Applied"] + ::Application::ACTIVE_STATUSES
      # attribute :specialist, Attributes::BelongsTo
    end
  end
end
