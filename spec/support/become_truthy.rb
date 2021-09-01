# frozen_string_literal: true

require "timeout"

# https://www.varvet.com/blog/why-wait_until-was-removed-from-capybara/
RSpec::Matchers.define(:become_truthy) do
  supports_block_expectations

  match do |block|
    Timeout.timeout(Capybara.default_max_wait_time) do
      sleep(0.05) until (value = block.call)
      value
    end
  rescue TimeoutError
    false
  end
end
