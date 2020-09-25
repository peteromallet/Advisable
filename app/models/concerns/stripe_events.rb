module StripeEvents
  def self.process(event)
    klass = class_for_event(event.type)
    return klass.new(event).process if klass
    true
  end

  def self.class_for_event(type)
    begin
      classified = type.gsub(".", "_").classify
      klass = "StripeEvents::#{classified}"
      klass.constantize
    rescue NameError
      Rails.logger.info "Could not process event '#{type}', #{klass} was not found"
      false
    end
  end
end