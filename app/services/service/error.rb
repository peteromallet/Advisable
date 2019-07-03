class Service::Error < StandardError
  attr_reader :code, :field, :message

  def initialize(code, **args)
    @code = code
    @message = args.fetch(:message, code)
    @field = args.fetch(:field, nil)
    super(code)
  end
end