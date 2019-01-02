# The base field class that should be used for all grapql fields.
# This includes some additional functionality arround authorization for fields.
class BaseField < GraphQL::Schema::Field
  attr_reader :authorize_method, :authorization_error_proc

  # We can pass authorize as a param to a field to require authorization in
  # order for that field to be accessed
  #
  # @example
  # The following will call the ProjectPolicy "is_user?" method to
  # determin wether or not the email can be accessed. If authorization fails
  # null willl be returned for the email.
  #
  #   class Types::Project < Types::BaseType
  #     field :email, String, null: true, authorize: :is_user
  #   end
  #
  def initialize(*args, authorize: nil, **kwargs, &block)
    @authorize_method = authorize
    # Pass on the default args:
    super(*args, **kwargs, &block)
  end

  def to_graphql
    field = super
    field = field_with_authorization(field) if authorize_method
    field
  end

  # Allows authorization to be configured inside the field block rather
  # than using a param.
  # Using this method we can provide an 'error' proc which will be called when
  # the authorization fails. This allows you to throw an error if authorization
  # fails. This proc will be passed the field value and the context.
  def authorize(method, error: nil)
    @authorize_method = method
    @authorization_error_proc = error
  end

  private

  # Returns the field redinfed with logic to handle authorization logic
  def field_with_authorization(field)
    resolve_proc = authorization_proc(field)

    field.redefine do
      resolve(resolve_proc)
    end
  end
  
  # returns a proc wrapping the original resolver that handles authorization
  # logic. If the field does not have a parent then the result of the resolve
  # function will be used as the value to test authorization against. This
  # usually only applies to fields on the root QueryType.
  def authorization_proc(field)
    original_resolve_proc = field.resolve_proc

    ->(obj, args, ctx) {
      resolved = original_resolve_proc.call(obj, args, ctx)
      value = obj.object || resolved

      policy = Pundit.policy!(ctx[:current_user], value)

      authorized = policy.send("#{authorize_method}?")
      return resolved if authorized

      if authorization_error_proc
        authorization_error_proc.call(value, ctx)
      end

      return nil
    }
  end
end