# frozen_string_literal: true

Sentry.init do |config|
  config.dsn = ENV["SENTRY_API_DSN"]
  config.send_default_pii = true
  config.breadcrumbs_logger = %i[sentry_logger active_support_logger]

  filter = ActiveSupport::ParameterFilter.new(Rails.application.config.filter_parameters)
  config.before_send = lambda do |event, _hint|
    # use Rails' parameter filter to sanitize the event
    filter.filter(event.to_hash)
  end

  # set a uniform sample rate between 0.0 and 1.0
  config.traces_sample_rate = 0.2

  # or control sampling dynamically
  # config.traces_sampler = lambda do |_sampling_context|
  #   # sampling_context[:transaction_context] contains the information about the transaction
  #   # sampling_context[:parent_sampled] contains the transaction's parent's sample decision
  #   true # return value can be a boolean or a float between 0.0 and 1.0
  # end
end
