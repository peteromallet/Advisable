# frozen_string_literal: true

module Recommendation
  class Random < Base
    def self.for(specialist, others)
      recommendation = others.order("RANDOM()")&.first
      new(specialist, recommendation)
    end
  end
end
