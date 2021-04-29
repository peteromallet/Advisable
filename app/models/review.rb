# frozen_string_literal: true

# Represents a review of a specialist in various contexts. A review will always
# have an attached specialist and project.
# The "reviewable" for a review represent the record that was reviewed. This
# again is a polymorphic assocation and is used to add more context to the
# review.
class Review < ApplicationRecord
  self.ignored_columns += %i[reviewable_id reviewable_type]

  include Uid
  include Airtable::Syncable

  # disable STI for the type column
  self.inheritance_column = :_type_disabled

  belongs_to :specialist, optional: true
  # The review project is a polymorphic association. The review
  # can either blong to a project or an off-platform project.
  belongs_to :project, polymorphic: true

  after_destroy :update_specialist_ratings
  after_destroy :update_specialist_reviews_count
  # After the record is saved we want to update the specialists average ratings
  after_save :update_specialist_ratings, if: :saved_change_to_ratings?

  after_save :update_specialist_reviews_count

  private

  def update_specialist_reviews_count
    return if specialist.blank?

    specialist.reviews_count = Review.where(specialist: specialist).count
    specialist.save(validate: false)
  end

  def update_specialist_ratings
    return if specialist.blank?

    collected_ratings.each do |name, collected|
      rating = (collected.sum / collected.length.to_f).round(2)
      specialist.ratings[name] = rating
    end

    specialist.save
  end

  def collected_ratings
    ratings = {}
    specialist.reviews.each do |review|
      next if review.ratings.nil?

      review.ratings.each do |name, rating|
        next if rating.nil?

        ratings[name] ||= []
        ratings[name] << rating
      end
    end
    ratings
  end
end

# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  comment       :text
#  project_type  :string
#  ratings       :jsonb
#  type          :string
#  uid           :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  airtable_id   :string
#  project_id    :bigint
#  specialist_id :bigint
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
