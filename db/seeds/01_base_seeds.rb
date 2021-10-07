# frozen_string_literal: true

# TestData.seed unless Rails.env.test?
NewTestData.new.seed! unless Rails.env.test?
