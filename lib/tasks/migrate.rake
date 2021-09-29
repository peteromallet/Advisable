# frozen_string_literal: true

require "ruby-progressbar"

class ReviewMigrator
  include PreviousProjectHelper

  attr_reader :reviews

  def initialize
    @reviews = Review.
      where.not(project_id: nil).
      joins(:project).
      where(project: {hide_from_profile: [nil, false]})
  end

  def migrate!
    progressbar = ProgressBar.create(format: "%a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: reviews.count)

    reviews.includes(:project).find_each do |review|
      review.company_name = previous_project_company_name(review.project)
      review.relationship = review.project.contact_relationship
      review.first_name = review.project.contact_first_name if review.first_name.blank?
      review.last_name = review.project.contact_last_name if review.last_name.blank?
      review.save(validate: false)
      progressbar.increment
    end
  end
end

namespace :migrate do
  task reviews: :environment do
    ReviewMigrator.new.migrate!
  end
end
