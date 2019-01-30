class OffPlatformProject < ApplicationRecord
  belongs_to :specialist
  has_many :reviews, as: :project
  has_many :project_skills, as: :project
  has_many :skills, through: :project_skills

  scope :validated, -> { where(validated: true )}

  def contact_name
    "#{contact_first_name} #{contact_last_name}"
  end

  def contact_name=(name)
    self.contact_first_name = name.split(" ").first
    self.contact_last_name = name.split(" ").last
  end
end
