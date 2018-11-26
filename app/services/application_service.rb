# Provides a base service class for service objects.
# It is a very light wrapper that implements a class level call class which instantiates
# the service object with the passed params and calls #call on the instance.
# This class should be used instead of the Service class.
class ApplicationService
  def self.call(*args)
    new(*args).call
  end

  def call
    raise NotImplementedError
  end
end