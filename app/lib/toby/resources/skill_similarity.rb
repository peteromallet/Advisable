# frozen_string_literal: true

module Toby
  module Resources
    class SkillSimilarity < BaseResource
      model_name ::SkillSimilarity

      attribute :skill1, Attributes::BelongsTo
      attribute :skill2, Attributes::BelongsTo
      attribute :similarity, Attributes::Integer
    end
  end
end
