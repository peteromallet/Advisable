class Application < ApplicationRecord
  belongs_to :specialist
  belongs_to :project

  def questions
    self[:questions] || []
  end
end
