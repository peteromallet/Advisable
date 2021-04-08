# frozen_string_literal: true

module Specialists
  class Recommender < ApplicationService
    RECOMMENDERS = [
      Recommenders::SkillsRecommendation,
      Recommenders::IndustriesRecommendation,
      Recommenders::RandomRecommendation
    ].freeze

    attr_reader :specialist

    def initialize(specialist)
      super()
      @specialist = specialist
    end

    def call
      recommender = RECOMMENDERS.sample
      others = Specialist.guild.where.not(id: specialist.id)
      recommender.recommendation_for(specialist, others)
    end
  end
end
