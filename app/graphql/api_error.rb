# The APIError should be used to throw errors in our graphql API. It ensures
# that each error will have a CODE which clients can use to determine what to
# do with the error.
# 
# @param [String] type The type of error.
# @param [String] code The error code for the error. This is can be used as a
# key in i18n libraries to display errors to users. This should be a camelCase
# string.
# @param [String] message The message for the error. An APIError message should
# never be displayed to users. It is provided to give devlopers more context
# as to what went wrong. Use the error code and additional extension properties
# to display errors to users.
# @param [Hash] extensions Any additional extensions to be added to the error.
#
# @example
#   raise APIError.new("NOT_AUTHORIZED", "notAuthorized", "Viewer does not have permission to execute this mutation.")
#
class ApiError < GraphQL::ExecutionError
  def initialize(type, code, message, extensions: {})
    super(message, extensions: extensions.merge({ type: type, code: code }).as_json)
  end
end

class ApiError::NotAuthenticated < ApiError
  def initialize(message)
    super("NOT_AUTHENTICATED", "notAuthenticated", message)
  end
end

class ApiError::NotAuthorized < ApiError
  def initialize(message)
    super("NOT_AUTHORIZED", "notAuthorized", message)
  end
end

# InvalidRequst can be rasied to indicate that the request the user has made is
# invalid. Although they have provided correct input values, the request could
# not complete for some reason.
# 
# @example
#   raise APIError::InvalidRequest.new("Application status must be 'Working'", "applicationStatusNotWorking")
#
class ApiError::InvalidRequest < ApiError
  def initialize(code, message)
    super("INVALID_REQUEST", code, message)
  end
end