# frozen_string_literal: true

module Recommendation
  class Base
    attr_reader :specialist, :recommendation

    def initialize(specialist, recommendation)
      @specialist = specialist
      @recommendation = recommendation
    end
  end
end
