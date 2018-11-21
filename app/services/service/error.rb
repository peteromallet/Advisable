class Service::Error < StandardError
  attr_reader :code, :field

  def initialize(msg, **args)
    @code = msg
    @field = args.fetch(:field, nil)
    super(msg)
  end
end