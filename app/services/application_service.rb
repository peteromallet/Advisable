class ApplicationService
  def self.call(*args, &block)
    begin
      service = new(*args, &block)
      Response.new(value: service.call)
    rescue StandardError => error
      Response.new(error: error)
    end
  end

  def call
    raise NotImplementedError
  end
end
