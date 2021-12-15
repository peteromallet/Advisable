# frozen_string_literal: true
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
#  id            :integer          not null, primary key
#  specialist_id :integer
#  project_id    :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  status        :string
#
# Indexes
#
#  index_matches_on_project_id     (project_id)
#  index_matches_on_specialist_id  (specialist_id)
#
