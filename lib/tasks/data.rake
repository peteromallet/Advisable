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
end
