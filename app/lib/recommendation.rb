# frozen_string_literal: true

module Recommendation
  RECOMMENDERS = [
    Skills,
    Industry,
    Random
  ].freeze

  def self.recommend(specialist)
    recommender = RECOMMENDERS.sample
    others = Specialist.active.accepted.guild.joins(:account).merge(Account.active).where.not(id: specialist.id)
    recommender.for(specialist, others)
  end
end
