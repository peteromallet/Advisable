class Service::Error < StandardError
  attr_reader :code, :field

  def initialize(code, **args)
    @code = code
    @field = args.fetch(:field, nil)
    super(code)
  end
end