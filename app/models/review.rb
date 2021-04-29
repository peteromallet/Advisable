# frozen_string_literal: true

# Represents a review of a specialist in various contexts. A review will always
# have an attached specialist and project.
# The "reviewable" for a review represent the record that was reviewed. This
# again is a polymorphic assocation and is used to add more context to the
# review.
class Review < ApplicationRecord
  include Uid
  include Airtable::Syncable

  # disable STI for the type column
  self.inheritance_column = :_type_disabled

  belongs_to :specialist, optional: true
  # The review project is a polymorphic association. The review
  # can either blong to a project or an off-platform project.
  belongs_to :project, polymorphic: true
  # The 'reviewable' for a review represents the record that was reviewed. This
  # can be a 'application' or 'interview'
  belongs_to :reviewable, polymorphic: true, optional: true

  after_destroy :update_specialist_ratings
  after_destroy :update_specialist_reviews_count
  # After the record is saved we want to update the specialists average ratings
  after_save :update_specialist_ratings, if: :saved_change_to_ratings?

  after_save :update_specialist_reviews_count

  private

  def update_specialist_reviews_count
    return if specialist.blank?

    specialist.reviews_count =
      Review.where(
        specialist: specialist,
        type: ['On-Platform Job Review', 'Off-Platform Project Review']
      ).count
    specialist.save(validate: false)
  end

  def update_specialist_ratings
    return if specialist.blank?

    Specialists::CalculateRatings.call(specialist: specialist)
  end
end

# == Schema Information
#
# Table name: reviews
#
#  id              :bigint           not null, primary key
#  comment         :text
#  project_type    :string
#  ratings         :jsonb
#  reviewable_type :string
#  type            :string
#  uid             :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  airtable_id     :string
#  project_id      :bigint
#  reviewable_id   :bigint
#  specialist_id   :bigint
#
# Indexes
#
#  index_reviews_on_airtable_id    (airtable_id)
#  index_reviews_on_project        (project_type,project_id)
#  index_reviews_on_reviewable     (reviewable_type,reviewable_id)
#  index_reviews_on_specialist_id  (specialist_id)
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#
