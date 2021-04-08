# frozen_string_literal: true

module Specialists
  module Recommenders
    class Recommendation
      attr_reader :specialist, :recommendation

      def initialize(specialist, recommendation)
        @specialist = specialist
        @recommendation = recommendation
      end
    end
  end
end
