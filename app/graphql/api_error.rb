# frozen_string_literal: true

# The ApiError should be used to throw errors in our graphql API. It ensures
# that each error will have a CODE which clients can use to determine what to
# do with the error.
#
# @param [String] type The type of error.
# @param [String] code The error code for the error. This is can be used as a
# key in i18n libraries to display errors to users. This should be a camelCase
# string.
# @param [String] message The message for the error. An ApiError message should
# never be displayed to users. It is provided to give devlopers more context
# as to what went wrong. Use the error code and additional extension properties
# to display errors to users.
# @param [Hash] extensions Any additional extensions to be added to the error.
#
# @example
#   raise ApiError.new("NOT_AUTHORIZED", "notAuthorized", "Viewer does not have permission to execute this mutation.")
#
class ApiError < GraphQL::ExecutionError
  class NotAuthenticated < ApiError
    def initialize(message = "You are not logged in", extensions: {})
      super("NOT_AUTHENTICATED", "notAuthenticated", message, extensions: extensions)
    end
  end

  class NotAuthorized < ApiError
    def initialize(message, extensions: {})
      super("NOT_AUTHORIZED", "notAuthorized", message, extensions: extensions)
    end
  end

  class InvalidRequest < ApiError
    def initialize(code, message, extensions: {})
      super("INVALID_REQUEST", code, message, extensions: extensions)
    end
  end

  def initialize(type, code, message, extensions: {})
    super(
      message,
      extensions: extensions.merge({type: type, code: code}).as_json
    )
  end

  def self.invalid_request(code, message = "", extensions: {})
    message = code if message.blank?
    raise ApiError::InvalidRequest.new(code, message, extensions: extensions)
  end

  def self.not_authorized(message, extensions: {})
    raise ApiError::NotAuthorized.new(message, extensions: extensions)
  end

  def self.not_authenticated(message = "You are not logged in", extensions: {})
    raise ApiError::NotAuthenticated.new(message, extensions: extensions)
  end

  def self.service_error(error, extensions: {})
    raise ApiError::InvalidRequest.new(error.code, error.message, extensions: extensions)
  end
end
