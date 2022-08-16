# frozen_string_literal: true

module StripeEvents
  class BaseEvent
    attr_reader :event

    def initialize(event)
      @event = event
    end

    def process
      raise NotImplementedError
    end
  end
end
