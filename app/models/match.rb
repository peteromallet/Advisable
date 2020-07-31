# matches a specialist to a project.
# Records in the "matches" table are currently created off platform inside
# of airtable.
#
# This model is not actually used inside of the application, it is simply
# synced to postgres for analysis.
class Match < ApplicationRecord
  belongs_to :specialist
  belongs_to :project
end
