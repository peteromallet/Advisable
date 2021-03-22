# frozen_string_literal: true

class RecommendedSpecialist < ApplicationRecord
  MATCH_CATEGORIES = %w[random skill industry].freeze
  belongs_to :recommendation, class_name: 'Specialist'
  belongs_to :specialist

  validates :recommendation, uniqueness: {
    scope: %i[specialist],
    message: "has already been recommended"
  }
  validates :match_category, inclusion: {in: RecommendedSpecialist::MATCH_CATEGORIES}
end

# == Schema Information
#
# Table name: recommended_specialists
#
#  id                :uuid             not null, primary key
#  match_category    :string           not null
#  match_tokens      :string           is an Array
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  recommendation_id :bigint
#  specialist_id     :bigint
#
# Indexes
#
#  index_recommended_spe_on_recommendation_id_and_spe_id  (recommendation_id,specialist_id) UNIQUE
#  index_recommended_specialists_on_match_tokens          (match_tokens) USING gin
#  index_recommended_specialists_on_recommendation_id     (recommendation_id)
#  index_recommended_specialists_on_specialist_id         (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (recommendation_id => specialists.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
