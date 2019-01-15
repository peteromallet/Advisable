class OffPlatformProject < ApplicationRecord
  belongs_to :specialist
  has_many :reviews, as: :project

  scope :validated, -> { where(validated: true )}

  def contact_name
    "#{contact_first_name} #{contact_last_name}"
  end
end
