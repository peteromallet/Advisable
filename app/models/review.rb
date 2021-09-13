# frozen_string_literal: true

# Represents a review of a specialist in various contexts. A review will always
# have an attached specialist and project.
# The "reviewable" for a review represent the record that was reviewed. This
# again is a polymorphic assocation and is used to add more context to the
# review.
class Review < ApplicationRecord
  include Uid
  include Resizable

  belongs_to :specialist, optional: true, counter_cache: true
  belongs_to :project, optional: true, class_name: "PreviousProject"
  belongs_to :case_study_article, optional: true, class_name: "CaseStudy::Article"

  has_one_attached :avatar
  resize avatar: {resize_to_limit: [400, 400]}

  after_destroy :update_specialist_ratings
  # After the record is saved we want to update the specialists average ratings
  after_save :update_specialist_ratings, if: :saved_change_to_ratings?

  def name
    @name ||= [first_name, last_name].select(&:present?).join(" ")
  end

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
#  id                    :bigint           not null, primary key
#  comment               :text
#  first_name            :string
#  last_name             :string
#  ratings               :jsonb
#  uid                   :string           not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  airtable_id           :string
#  case_study_article_id :bigint
#  project_id            :bigint
#  specialist_id         :bigint
#
# Indexes
#
#  index_reviews_on_airtable_id            (airtable_id)
#  index_reviews_on_case_study_article_id  (case_study_article_id)
#  index_reviews_on_specialist_id          (specialist_id)
#  index_reviews_on_uid                    (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (case_study_article_id => case_study_articles.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
