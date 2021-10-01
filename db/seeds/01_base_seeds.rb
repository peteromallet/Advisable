# frozen_string_literal: true

report = AppProfiler.run(mode: :cpu) do
  TestData.seed unless Rails.env.test?
end

report.view
