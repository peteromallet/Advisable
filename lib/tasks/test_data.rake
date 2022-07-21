# frozen_string_literal: true

require "yaml"
require "ruby-progressbar"
require_relative "../../config/environment"

namespace :test_data do
  task random_results: :environment do
    test_data = YAML.load_file(Rails.root.join("db", "seeds", "test_data.yml"))
    categories = ["increase", "impact", "revenue", "creative", "strategy", "multiply", "optimise", "launch"]

    CaseStudy::ResultsContent.all.each do |c|
      content = {
        results: [
          {
            category: categories.sample,
            callout: test_data["results"]["callouts"].sample,
            context: Faker::ChuckNorris.fact
          },
          {
            category: categories.sample,
            callout: test_data["results"]["callouts"].sample,
            context: Faker::ChuckNorris.fact
          }
        ]
      }

      c.update(content:)
    end
  end
end
