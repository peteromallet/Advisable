if Rails.env.development?
  GraphQL::RailsLogger.configure do |config|
    config.skip_introspection_query = true
  end
end