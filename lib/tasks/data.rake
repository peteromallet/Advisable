# frozen_string_literal: true

require "ruby-progressbar"
require_relative "../../config/environment"

namespace :data do
  task prepare: :environment do
    NewTestData.new.seed!
  end

  task industries: :environment do
    industries_file = Rails.root.join("lib", "tasks", "data", "industries.txt")
    industries = File.readlines(industries_file).map(&:strip)
    industries.each { |name| Industry.create(name:) }
  end

  task interviews: :environment do
    Interview.find_each do |interview|
      next unless interview.application&.specialist_id

      interview.update!(specialist_id: interview.application.specialist_id)
    end
  end
end
