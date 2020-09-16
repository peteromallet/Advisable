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

# == Schema Information
#
# Table name: matches
#
#  id            :bigint           not null, primary key
#  status        :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  project_id    :bigint
#  specialist_id :bigint
#
# Indexes
#
#  index_matches_on_project_id     (project_id)
#  index_matches_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
