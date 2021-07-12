# frozen_string_literal: true

FactoryBot.define do
  factory :skill_similarity do
    skill1 factory: :skill, strategy: :create
    skill2 factory: :skill, strategy: :create
    similarity { 50 }
  end
end
