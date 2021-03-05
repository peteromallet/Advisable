# frozen_string_literal: true

module StripeEvents
  def self.process(event)
    klass = class_for_event(event.type)
    return true unless klass

    klass.new(event).process
  end

  def self.class_for_event(type)
    StripeEvents.const_get(type.tr(".", "_").classify)
  rescue NameError
    Rails.logger.info "Could not process event '#{type}', class was not found"
    nil
  end
end
