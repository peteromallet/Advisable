# frozen_string_literal: true

module Types
  class BaseArgument < GraphQL::Schema::Argument
    def authorized?(_obj, _value, ctx)
      check_for_argument_deprecations(ctx)
      super
    end

    private

    def check_for_argument_deprecations(context)
      return if deprecation_reason.blank?

      Sentry.capture_message(
        "Deprecated argument #{name} on #{owner.name} detected",
        backtrace: caller,
        level: "debug",
        extra: {
          query: context&.query&.query_string
        }
      )
    end
  end
end
