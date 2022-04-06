# frozen_string_literal: true

require "ruby-progressbar"
require_relative "../../config/environment"

namespace :data do
  task prepare: :environment do
    TestData.new.seed!
  end

  task create_file: :environment do
    ProductionData.new.create_file!
  end
end
