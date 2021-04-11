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
      others = Specialist.joins(:account).guild.where(account: {deleted_at: nil}).where.not(id: specialist.id)
      recommender.recommendation_for(specialist, others)
    end
  end
end
