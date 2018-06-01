class Service::Response
  attr_reader :error, :data

  def initialize(data: nil, error: nil)
    @data = data
    @error = error
  end

  def ok?
    error.nil?
  end
end
