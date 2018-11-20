class Service::Errors < StandardError
  attr_reader :errors

  def initialize(errors = [])
    @errors = errors
  end
end