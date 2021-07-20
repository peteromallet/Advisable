# frozen_string_literal: true

# Represents a review of a specialist in various contexts. A review will always
# have an attached specialist and project.
# The "reviewable" for a review represent the record that was reviewed. This
# again is a polymorphic assocation and is used to add more context to the
# review.
class Review < ApplicationRecord
  include Uid

  # disable STI for the type column
  self.inheritance_column = :_type_disabled

  belongs_to :specialist, optional: true, counter_cache: true
  belongs_to :project, class_name: "PreviousProject"

  after_destroy :update_specialist_ratings
  # After the record is saved we want to update the specialists average ratings
  after_save :update_specialist_ratings, if: :saved_change_to_ratings?

  private

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
#  ratings       :jsonb
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  airtable_id   :string
#  project_id    :bigint
#  specialist_id :bigint
#
# Indexes
#
#  index_reviews_on_airtable_id    (airtable_id)
#  index_reviews_on_specialist_id  (specialist_id)
#  index_reviews_on_uid            (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (specialist_id => specialists.id)
#
