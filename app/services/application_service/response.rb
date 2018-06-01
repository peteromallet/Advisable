class ApplicationService::Response
  attr_reader :error, :value

  def initialize(value: nil, error: nil)
    @value = value
    @error = error
  end

  def ok?
    error.nil?
  end
end
