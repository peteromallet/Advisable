# frozen_string_literal: true
class StripeEvents::BaseEvent
  attr_reader :event

  def initialize(event)
    @event = event
  end

  def process
    raise NotImplementedError
  end
end