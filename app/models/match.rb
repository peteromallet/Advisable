# matches a specialist to a project.
# Records in the "matches" table are currently created off platform.
class Match < ApplicationRecord
  belongs_to :specialist
  belongs_to :project
end
