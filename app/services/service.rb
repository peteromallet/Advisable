# All service classes should inherit from this Service class. It provides a
# pattern for handeling service objects.
# Every service object should have a #call instance method which contains the
# service business logic. The service can then be called using the class level
# call method.
# It is important that a service is called via the class level "call" method so
# that a service response object is returned.
#
class Service
  def self.call(*args, &block)
    begin
      service = new(*args, &block)
      Response.new(data: service.call)
    rescue StandardError => error
      Response.new(error: error)
    end
  end

  def call
    raise NotImplementedError
  end
end
