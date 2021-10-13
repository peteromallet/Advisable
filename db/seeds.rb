# frozen_string_literal: true

# The old way of seeding the database
# Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].sort.each { |seed| load seed }

NewTestData.new.seed! unless Rails.env.test?
