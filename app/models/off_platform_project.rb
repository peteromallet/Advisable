class OffPlatformProject < ApplicationRecord
  belongs_to :specialist
  has_many :reviews, as: :project

  scope :validated, -> { where(validated: true )}
end
