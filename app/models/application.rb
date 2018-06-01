class Application < ApplicationRecord
  belongs_to :specialist
  belongs_to :project
  validates :airtable_id, presence: true
  validates :rate, presence: true

  def questions
    self[:questions] || []
  end
end
