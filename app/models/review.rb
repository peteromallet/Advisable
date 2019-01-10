# Represents a review of a specialist in various contexts. A review will always
# have an attached specialist and project.
# The project of a reivew is a polymorphic association. In the database there is
# a project_type and a project_id column to determin which record to load. This
# is required as a review can be for an advisable project (Project) or an
# off-platform project (OffPlatformProject).
# The "reviewable" for a review represent the record that was reviewed. This
# again is a polymorphic assocation and is used to add more context to the
# review.
class Review < ApplicationRecord
  # disable STI for the type column
  self.inheritance_column = :_type_disabled

  belongs_to :specialist, counter_cache: true
  # The review project is a polymorphic association. The review
  # can either blong to a project or an off-platform project. 
  belongs_to :project, polymorphic: true
  # The 'reviewable' for a review represents the record that was reviewed. This
  # can be a 'booking', 'application' or 'interview'
  belongs_to :reviewable, polymorphic: true, required: false

  # After the record is saved we want to update the specialists average ratings
  after_save :update_specialist_ratings

  private

  def update_specialist_ratings
    return unless specialist.present? && saved_change_to_ratings?
    Specialists::CalculateRatings.call(specialist: specialist)
  end
end
