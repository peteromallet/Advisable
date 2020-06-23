require 'rspec/rails'
require 'rspec/retry'

RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.verbose_retry = true

  # run retry only on features
  config.around :each, type: :system do |ex|
    ex.run_with_retry(retry: ENV['RSPEC_RETRY']) if ENV['RSPEC_RETRY']
  end

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.filter_run_when_matching :focus

  # TODO: Use `RSpec.describe` everywhere...
  # config.disable_monkey_patching!

  config.profile_examples = 10
  config.order = :random

  if config.files_to_run.one?
    config.default_formatter = 'doc'
  end

  Kernel.srand config.seed
end
