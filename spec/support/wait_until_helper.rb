# frozen_string_literal: true

module WaitUntilHelper
  def wait_until(duration = 5, start_time = Time.zone.now, &)
    yield
  rescue RSpec::Expectations::ExpectationNotMetError
    delta = Time.zone.now - start_time
    raise if delta > duration

    sleep 0.1
    wait_until(duration, start_time, &)
  end
end
