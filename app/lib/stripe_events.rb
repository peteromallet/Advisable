# frozen_string_literal: true

module StripeEvents
  def self.process(event)
    klass = class_for_event(event.type)
    if klass
      klass.new(event).process
    else
      true
    end
  end

  def self.class_for_event(type)
    classified = type.tr(".", "_").classify
    klass = "StripeEvents::#{classified}"
    klass.constantize
  rescue NameError
    Rails.logger.info("Could not process event '#{type}', #{klass} was not found")
    false
  end
end
